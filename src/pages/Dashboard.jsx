import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import IncomeModal from '../components/Modals/IncomeModal';
import ExpenseModal from '../components/Modals/ExpenseModal';
import { addIncome, addExpense, getDashboardData, getBudgetGoals } from '../services/dashboard';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const { auth } = useContext(AuthContext);
  const [isIncomeModalOpen, setIsIncomeModalOpen] = useState(false);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [dashboardData, setDashboardData] = useState({ income: 0, expenses: 0, expensesByCategory: {} });
  const [budgetGoals, setBudgetGoals] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState('');

  const fetchDashboardData = async () => {
    try {
      const data = await getDashboardData(auth);
      setDashboardData(data);

      // Obtener metas de presupuesto
      const goals = await getBudgetGoals(auth);
      setBudgetGoals(goals);

      const categories = goals.map(goal => goal.category);
      const budgets = goals.map(goal => goal.budget);
      const expenses = categories.map(category => {
        const expense = data.expensesByCategory?.[category] || 0;
        return expense;
      });

      // Actualizar datos del gráfico
      setChartData({
        labels: categories,
        datasets: [
          {
            label: 'Meta de presupuesto',
            data: budgets,
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
          },
          {
            label: 'Gastos',
            data: expenses,
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
          },
        ],
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setError(error.message);
    }
  };

  const handleAddIncome = async (incomeData) => {
    try {
      const data = await addIncome(incomeData, auth);
      if (data) {
        await fetchDashboardData();
      }
    } catch (error) {
      console.error('Adding income error:', error);
      setError(error.message);
    }
  };

  const handleAddExpense = async (expenseData) => {
    try {
      const data = await addExpense(expenseData, auth);
      if (data) {
        await fetchDashboardData();
      }
    } catch (error) {
      console.error('Adding expense error:', error);
      setError(error.message);
    }
  };

  useEffect(() => {
    if (auth) {
      fetchDashboardData();
    }
  }, [auth]);

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Bienvenido al resumen de tus finanzas personales.</p>

      <div>
        <p>Ingresos Totales: ${dashboardData.income}</p>
        <p>Gastos Totales: ${dashboardData.expenses}</p>
      </div>

      <button onClick={() => setIsIncomeModalOpen(true)}>Agregar Ingreso</button>
      <button onClick={() => setIsExpenseModalOpen(true)}>Agregar Gasto</button>

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

      {chartData && (
        <div style={{ marginTop: '20px' }}>
          <h3>Comparación de Presupuesto vs Gastos</h3>
          <Bar
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: { position: 'top' },
                title: { display: true, text: 'Presupuesto vs Gastos por Categoría' },
              },
            }}
          />
        </div>
      )}

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
    </div>
  );
};

export default Dashboard;
