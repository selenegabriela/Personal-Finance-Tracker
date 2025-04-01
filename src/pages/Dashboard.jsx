import React, { useState, useContext, useEffect, useCallback, useMemo } from 'react';
import IncomeModal from '../components/Modals/IncomeModal';
import ExpenseModal from '../components/Modals/ExpenseModal';
import { AuthContext } from '../context/AuthContext';
import { addIncome, addExpense, getExpenses, getDashboardData, getBudgetGoal, getIncomes, addBudgetGoal } from '../services/dashboard';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import ExpensesList from '../components/Lists/ExpensesList';
import IncomesList from '../components/Lists/IncomesList';
import BudgetGoalsList from '../components/Lists/BudgetGoalsList';
import BudgetGoalModal from '../components/Modals/BudgetGoalModal';
import MonthAndYearModal from '../components/Modals/MonthAndYearModal';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
    const { auth, years, monthJoined } = useContext(AuthContext);
    const [isIncomeModalOpen, setIsIncomeModalOpen] = useState(false);
    const [dataDashboard, setDataDashboard] = useState({});
    const [dataExpenses, setDataExpenses] = useState([]);
    const [dataIncomes, setDataIncomes] = useState([]);
    const [dataBudgetGoals, setDataBudgetGoals] = useState([]);
    const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
    const [isMonthAndYearModalOpen, setIsMonthAndYearModalOpen] = useState(false);
    const [isBudgetGoalModalOpen, setIsBudgetGoalModalOpen] = useState(false);
    const [error, setError] = useState('');
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const lastMonth = months[new Date().getMonth()+1]
    const [currentMonth, setCurrentMonth] = useState(months[new Date().getMonth()]);
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const buttonStyle = {
        backgroundColor: '#191818', 
        border: "none",
        padding: "8px 12px",
        margin: "5px",
        borderRadius: "5px",
        color: "white",
        cursor: "pointer",
        transition: "all 0.2s ease-in-out",
      };
      const headerStyle = {
        top: 0,
        padding: "10px",
        backgroundColor: '#242424'
    };
    const fetchDashboardData = useCallback(async () => {
        try {

            const data = await getDashboardData(auth, currentMonth, currentYear);
            if (data) setDataDashboard(data);
        } catch (err) {
            console.error('Error fetching dashboard data:', err);
            setError(err.message);
        }
    }, [auth,currentMonth,currentYear]);


    const getAllExpenses = useCallback(async () => {
        try {
            const data = await getExpenses(auth, currentMonth, currentYear);
            if (data) setDataExpenses(data);
        } catch (err) {
            console.error('Error fetching expenses data:', err);
            setError(err.message);
        }
    }, [auth,currentMonth,currentYear]);

    const getAllIncomes = useCallback(async () => {
        try {
            const data = await getIncomes(auth, currentMonth, currentYear);
            if (data) setDataIncomes(data);
        } catch (err) {
            console.error('Error fetching incomes data:', err);
            setError(err.message);
        }
    }, [auth,currentMonth, currentYear]);

    const getAllBudgetGoals = useCallback(async () => {
        try {
            const data = await getBudgetGoal(auth, currentMonth, currentYear);
            if (data) setDataBudgetGoals(data);
        } catch (err) {
            console.error('Error fetching budget goals data:', err);
            setError(err.message);
        }
    }, [auth,currentMonth, currentYear]);
    
    const handleAddIncome = async (income) => {
        try {
            const data = await addIncome(income, auth);
            if (data) {
                await fetchDashboardData();
                await getAllIncomes();
            } else {
                console.log('Error adding income');
            }
        } catch (err) {
            console.error('Adding income error:', err);
            setError(err.message);
        }
    };

    const handleAddExpense = async (expense) => {
        try {
            const data = await addExpense(expense, auth);
            if (data) {
                await fetchDashboardData();
                await getAllExpenses();
            } else {
                console.log('Error adding expense');
            }
        } catch (err) {
            console.error('Adding expense error:', err);
            setError(err.message);
        }
    };

    const handleAddBudgetGoal = async (budgetGoals) => {
        try {
            const data = await addBudgetGoal(budgetGoals, auth);
            if (data) {
                await fetchDashboardData();
                await getAllBudgetGoals();
            } else {
                console.log('Error adding budget goal');
            }
        } catch (err) {
            console.error('Adding budget goal error:', err);
            setError(err.message);
        }
    };

 
    useEffect(() => {
        if (auth) {
            fetchDashboardData();
        }
    }, [auth, fetchDashboardData]);

    useEffect(() => {
        if (auth) {
            getAllExpenses();
        }
    }, [auth, getAllExpenses]);

    useEffect(() => {
        if (auth) {
            getAllIncomes();
        }
    }, [auth, getAllIncomes]);

    useEffect(() => {
        if (auth) {
            getAllBudgetGoals();
        }
    }, [auth, getAllBudgetGoals]);

    // Memoize chartData to avoid recalculating on every render
    const chartData = useMemo(() => {
        
        if (!dataDashboard || !Array.isArray(dataDashboard.budgetGoals)) {
            return null;
        }

        const categories = dataDashboard.budgetGoals.map(goal => goal.category);
        const budgets = dataDashboard.budgetGoals.map(goal => goal.amount);
        const expenses = categories.map(category => dataDashboard.expensesByCategory?.[category] || 0);

        return {
            labels: categories,
            datasets: [
                {
                    label: 'Budget Goal',
                    data: budgets,
                    backgroundColor: 'rgb(249, 250, 240)',
                },
                {
                    label: 'Expenses',
                    data: expenses,
                    backgroundColor: 'rgba(213, 29, 69, 0.82)',
                }
            ]
        };
    }, [dataDashboard]);

    return (
        <div>
            <div style={{marginTop: '30px'}}>

            <div style={{maxWidth: '70%', fontWeight: 'bold', borderRadius: "5px", border: "1px solid #c7c417", margin: '0 auto'}}>
                <center>

                    <h3>{`${currentMonth || 0} ${currentYear || 0} `}</h3>
                    <h3>Total budget: {dataDashboard?.totalBudget || 0}</h3>
                </center>
                <div style={{display: 'flex', gap: '10px', justifyContent: 'center'}}>
                    <button style={buttonStyle} onClick={() => setIsIncomeModalOpen(true)}>Add Income</button>
                    <button style={buttonStyle} onClick={() => setIsExpenseModalOpen(true)}>Add Expense</button>
                    <button style={buttonStyle} onClick={() => setIsBudgetGoalModalOpen(true)}>Add Budget Goal</button>
                    <button style={buttonStyle} onClick={() => setIsMonthAndYearModalOpen(true)}>Change period</button>
                </div>
            </div>

            <MonthAndYearModal 
                onSave ={fetchDashboardData}
                setCurrentMonth ={setCurrentMonth}
                setCurrentYear ={setCurrentYear}
                currentMonth ={currentMonth}
                currentYear ={currentYear}
                months = {months}
                years ={years}
                onClose={() => setIsMonthAndYearModalOpen(false)}
                isOpen={isMonthAndYearModalOpen}
                monthJoined={monthJoined}
                lastMonth={lastMonth}
            />

            <IncomeModal
                isOpen={isIncomeModalOpen}
                onClose={() => setIsIncomeModalOpen(false)}
                onSave={handleAddIncome}
            />
            <ExpenseModal
                isOpen={isExpenseModalOpen}
                onClose={() => setIsExpenseModalOpen(false)}
                onSave={handleAddExpense}
                dataBudgetGoals={dataBudgetGoals}
            />
            <BudgetGoalModal
                dataBudgetGoals={dataBudgetGoals}
                isOpen={isBudgetGoalModalOpen}
                onClose={() => setIsBudgetGoalModalOpen(false)}
                onSave={handleAddBudgetGoal}
                fetchDashboardData={fetchDashboardData}
            />
            {chartData && (
                <center><div style={{ margin: '20px auto', maxWidth: '80%' }}>
                    <Bar
                        data={chartData}
                        options={{
                            responsive: true,
                            plugins: {
                                legend: { position: 'top' },
                                title: { display: true, text: 'Budget vs Expenses by category' },
                            }
                        }}
                    />
                </div></center>
            )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-around', overflow: 'scroll' }}>
                <div>
                    <center><h3 style={headerStyle}>Expenses</h3></center>
                    <div style={{ maxHeight: '350px' }}>
                        {dataExpenses.map(expense => (
                            <ExpensesList
                                key={expense._id}
                                expense={expense}
                                auth={auth}
                                getAllExpenses={getAllExpenses}
                                fetchDashboardData={fetchDashboardData}
                            />
                        ))}
                    </div>
                </div>
                <div>
                    <center><h3 style={headerStyle}>Incomes</h3></center>
                    <div style={{ maxHeight: '350px' }}>
                        {dataIncomes.map(income => (
                            <IncomesList
                                key={income._id}
                                income={income}
                                auth={auth}
                                getAllIncomes={getAllIncomes}
                                fetchDashboardData={fetchDashboardData}
                            />
                        ))}
                    </div>
                </div>
                <div>
                    <center><h3 style={headerStyle}>Budget Goals</h3></center>
                    <div style={{ maxHeight: '350px' }}>
                        {dataBudgetGoals.map(budgetGoal => (
                            <BudgetGoalsList
                                key={budgetGoal._id}
                                budgetGoal={budgetGoal}
                                auth={auth}
                                getAllBudgetGoals={getAllBudgetGoals}
                                fetchDashboardData={fetchDashboardData}
                            />
                        ))}
                    </div>
                </div>
            </div>
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        </div>
    );
};

export default React.memo(Dashboard);