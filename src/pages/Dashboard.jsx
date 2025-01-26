import IncomeModal from '../components/Modals/IncomeModal';
import ExpenseModal from '../components/Modals/ExpenseModal';
import { AuthContext } from '../context/AuthContext';
import { addIncome, addExpense, getExpenses, getDashboardData, getBudgetGoal,getIncomes,addBudgetGoal } from '../services/dashboard';
import { useState, useContext, useEffect, useCallback } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import ExpensesList from '../components/Lists/ExpensesList';
import IncomesList from '../components/Lists/IncomesList';
import BudgetGoalsList from '../components/Lists/BudgetGoalsList';
import BudgetGoalModal from '../components/Modals/BudgetGoalModal';

// Registrar los componentes necesarios de Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
const Dashboard = () => {
    const { auth } = useContext(AuthContext);
    console.log(auth);
    const [isIncomeModalOpen, setIsIncomeModalOpen] = useState(false)
    const [dataDashboard, setDataDashboard] = useState({})
    const [dataExpenses, setDataExpenses] = useState([])
    const [dataIncomes, setDataIncomes] = useState([])
    const [dataBudgetGoals, setDataBudgetGoals] = useState([])
    const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false)
    const [isBudgetGoalModalOpen, setIsBudgetGoalModalOpen] = useState(false)
    const [error, setError] = useState('')

    const [chartData, setChartData] = useState(null)

    const getAllExpenses = useCallback(async() => {
        try {
            const data = await getExpenses(auth)
            if(data) setDataExpenses(data)
        } catch (err) {
            console.error('Error fetching expenses data:', err);
            setError(err.message);  
        }
    },[auth])

    const getAllIncomes = useCallback(async() => {
        try {
            const data = await getIncomes(auth)
            if(data) setDataIncomes(data)
        } catch (err) {
            console.error('Error fetching incomes data:', err);
            setError(err.message);  
        }
    },[auth])

    const getAllBudgetGoals = useCallback(async() => {
        try {
            const data = await getBudgetGoal(auth)
            if(data) setDataBudgetGoals(data)
            
        } catch (err) {
            console.error('Error fetching budget goals data:', err);
            setError(err.message);  
        }
    },[auth])

    const fetchDashboardData = useCallback(async() => {
        try {
            const data = await getDashboardData(auth)
            if(data) setDataDashboard(data)

            const goals = await getBudgetGoal(auth)


            const categories = goals.map(goal => goal.category);
            const budgets = goals.map(goal => goal.amount)
            const expenses = categories.map(category => {
                const expense = data.expensesByCategory?.[category] || 0;
                return expense
            })

            setChartData({
                labels: categories,
                datasets: [
                    {
                        label: 'Budget Goal',
                        data: budgets,
                        backgroundColor: 'rgba(5, 121, 199, 0.6)',
                    },
                    {
                        label: 'Expenses',
                        data: expenses,
                        backgroundColor: 'rgba(213, 29, 69, 0.6)',
                    }
                ]
            })
            
        } catch (err) {
            console.error('Error fetching dashboard data:', err);
            setError(err.message);            
        }
    },[auth])
    

    const handleAddIncome = async (income) => {
        try {
            const data = await addIncome(income,auth)
            if(data) {
                await fetchDashboardData()
            } else {
                console.log('Error adding income')
            }
        } catch (err) {
            console.error('Adding income error:', err);
            setError(err.message);
        }
    }
    const handleAddExpense = async(expense) => {
        try {
            const data = await addExpense(expense,auth)
            
            if(data){
                await fetchDashboardData()
                await getAllExpenses()
            } else {
                console.log('Error adding expense')
            }
        } catch (err) {
            console.error('Adding expense error:', err);
            setError(err.message);
        }
    }
    const handleAddBudgetGoal = async(budgetGoals) => {
        try {
            const data = await addBudgetGoal(budgetGoals,auth)
            
            if(data){
                await fetchDashboardData()
                await getAllBudgetGoals()
            } else {
                console.log('Error adding budget goal')
            }
        } catch (err) {
            console.error('Adding budget goal error:', err);
            setError(err.message);
        }
    }
    
    useEffect(() => {
        if(auth){
            fetchDashboardData();
        }
    },[auth,fetchDashboardData])

    useEffect(() => {
        if(auth){
            getAllExpenses();
        }
    },[auth,getAllExpenses])

    useEffect(() => {
        if(auth){
            getAllIncomes();
        }
    },[auth,getAllIncomes])

    useEffect(() => {
        if(auth){
            getAllBudgetGoals();
        }
    },[auth,getAllBudgetGoals])

    return(
        <div>
            <h2>Dashboard</h2>
            <p>Welcome to your Dashboard</p>

            <h3>Total budget: {dataDashboard.totalBudget || 0}</h3>
            <button onClick={() => setIsIncomeModalOpen(true)}>Add Income</button>
            <button onClick={() => setIsExpenseModalOpen(true)}>Add Expense</button>
            <button onClick={() => setIsBudgetGoalModalOpen(true)}>Add Budget Goal</button>

            <IncomeModal
                isOpen={isIncomeModalOpen}
                onClose={() => setIsIncomeModalOpen(false)}
                onSave={handleAddIncome}
            />
            <ExpenseModal
                isOpen={isExpenseModalOpen}
                onClose={() => setIsExpenseModalOpen(false)}
                onSave={handleAddExpense}
            />
            <BudgetGoalModal 
                isOpen={isBudgetGoalModalOpen}
                onClose={() => setIsBudgetGoalModalOpen(false)}
                onSave={handleAddBudgetGoal}
            />
            {chartData && (
                <div style={{ marginTop: '20px', maxWidth: '80%', marginLeft: 'auto', marginRight: 'auto'}}>
                    <h3>Budget vs Expenses</h3>
                    <Bar
                        data={chartData}
                        options={{
                            responsive: true,
                            plugins: {
                                legend: {position: 'top'},
                                title: {display: true, text: 'Budget vs Expenses by category'},
                            }
                        }

                        }
                    />

                </div>
            )}
            <div style={{display: 'flex', justifyContent: 'space-around', overflow: 'scroll', }}>

                <div>

                    <h3>Expenses</h3>
                    <div style={{maxHeight: '350px'}}>

                        {

                            dataExpenses && dataExpenses?.map(expense => {
                                return <ExpensesList 
                                        key={expense._id} 
                                        expense={expense} 
                                        auth={auth} 
                                        getAllExpenses={getAllExpenses} 
                                        fetchDashboardData={fetchDashboardData} 
                                    />
                            })

                        }
                    </div>
                </div>
                <div>

                    <h3>Incomes</h3>
                    <div style={{ maxHeight: '350px'}}>
                        {
                            
                            dataIncomes && dataIncomes?.map(income => {
                                return <IncomesList 
                                        key={income._id} 
                                        income={income} 
                                        auth={auth} 
                                        getAllIncomes={getAllIncomes} 
                                        fetchDashboardData={fetchDashboardData} 
                                    />
                                    })
                                }
                    </div>
                </div>
                <div>

                    <h3>Budget Goals</h3>
                    <div style={{ maxHeight: '350px'}}>
                        {
                            
                            dataBudgetGoals && dataBudgetGoals?.map(budgetGoal => {
                                return <BudgetGoalsList 
                                        key={budgetGoal._id} 
                                        budgetGoal={budgetGoal} 
                                        auth={auth} 
                                        getAllBudgetGoals={getAllBudgetGoals} 
                                        fetchDashboardData={fetchDashboardData} 
                                    />
                                    })
                                }
                    </div>
                </div>

            </div>
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        </div>
    )
} 

export default Dashboard;

