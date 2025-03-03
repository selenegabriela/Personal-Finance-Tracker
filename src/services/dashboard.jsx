const monthsOfTheYear = {
    'January': 0,
    'February': 1,
    'March': 2,
    'April': 3,
    'May': 4,
    'June': 5,
    'July': 6,
    'August': 7,
    'September': 8,
    'October': 9,
    'November': 10,
    'December': 11
};

export const addIncome = async(incomeData,auth) => {

    try {
        const response = await fetch('http://localhost:5000/api/incomes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${auth}` },
            body: JSON.stringify(incomeData)
        })
        if (!response.ok) {
            const errorData = await response.json(); 
            throw new Error(errorData.message || 'Adding income failed');
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error adding income', error.message);
        throw error; 
    }
}

export const getIncomes = async(auth,numberMonth,year) => {
    try {
        const month = monthsOfTheYear[numberMonth]
        const response = await fetch(`http://localhost:5000/api/incomes?month=${month+1}&year=${year}`, {
            headers: { Authorization: `Bearer ${auth}` },
        })

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error getting incomes', error.message);
        throw error;  
    }
}

export const addExpense = async(expenseData,auth) => {
    try {
        const response = await fetch('http://localhost:5000/api/expenses', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${auth}` },
            body: JSON.stringify(expenseData),
        })
        if (!response.ok) {
            const errorData = await response.json(); 
            throw new Error(errorData.message || 'Adding expense failed');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error adding expense', error.message);
        throw error;
    }
}

export const addBudgetGoal = async(BudgetGoalData,auth) => {
    try {
        const response = await fetch('http://localhost:5000/api/BudgetGoal', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${auth}` },
            body: JSON.stringify(BudgetGoalData),
        })
        if (!response.ok) {
            const errorData = await response.json(); 
            throw new Error(errorData.message || 'Adding Budget Goal failed');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error adding Budget Goal', error.message);
        throw error;
    }
}
export const updateExpense = async(expenseData,id,auth) => {
    try {
        const response = await fetch(`http://localhost:5000/api/expenses/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${auth}` },
            body: JSON.stringify(expenseData),
        })
        if (!response.ok) {
            const errorData = await response.json(); 
            throw new Error(errorData.message || 'Editing expense failed');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error adding expense', error.message);
        throw error;
    }
}
export const updateIncome = async(incomeData,id,auth) => {
    try {
        const response = await fetch(`http://localhost:5000/api/incomes/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${auth}` },
            body: JSON.stringify(incomeData),
        })
        if (!response.ok) {
            const errorData = await response.json(); 
            throw new Error(errorData.message || 'Editing income failed');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error adding income', error.message);
        throw error;
    }
}
export const updateBudgetGoals = async(BudgetGoal,id,auth) => {
    try {
        const response = await fetch(`http://localhost:5000/api/BudgetGoal/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${auth}` },
            body: JSON.stringify(BudgetGoal),
        })
        if (!response.ok) {
            const errorData = await response.json(); 
            throw new Error(errorData.message || 'Editing budget goal failed');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error adding budget goal', error.message);
        throw error;
    }
}

export const getExpenses = async(auth,numberMonth,year) => {
    
    try {
        const month = monthsOfTheYear[numberMonth]
        const response = await fetch(`http://localhost:5000/api/expenses?month=${month+1}&year=${year}`, {
            headers: { Authorization: `Bearer ${auth}` },
        })

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error getting expenses', error.message);
        throw error;  
    }
}

export const getExpense = async(auth,id) => {
    try {
        const response = await fetch(`http://localhost:5000/api/expenses/${id}`, {
            headers: { Authorization: `Bearer ${auth}` },
        })

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error getting expenses', error.message);
        throw error;  
    }
}

export const removeExpense = async(auth,id) => {
    try {
        const response = await fetch(`http://localhost:5000/api/expenses/${id}`, {
            headers: { Authorization: `Bearer ${auth}` },
            method: 'DELETE'
        })

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error removing expense', error.message);
        throw error;  
    }
}

export const removeIncome = async(auth,id) => {
    try {
        const response = await fetch(`http://localhost:5000/api/incomes/${id}`, {
            headers: { Authorization: `Bearer ${auth}` },
            method: 'DELETE'
        })

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error removing income', error.message);
        throw error;  
    }
}

export const removeBudgetGoal = async(auth,id) => {
    try {
        const response = await fetch(`http://localhost:5000/api/budgetGoal/${id}`, {
            headers: { Authorization: `Bearer ${auth}` },
            method: 'DELETE'
        })

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error removing income', error.message);
        throw error;  
    }
}

export const getDashboardData = async(auth,numberMonth,year) => {
    try {
        const month = monthsOfTheYear[numberMonth]

        const response = await fetch(`http://localhost:5000/api/dashboard?month=${month+1}&year=${year}`,{
            headers: { Authorization: `Bearer ${auth}` },
        })
        const data = await response.json();
        return data
    } catch (error) {
        console.error('Error getting dashboard', error.message);
        throw error;  
    }
}  

export const getBudgetGoal = async(auth,numberMonth,year) => {
    try {
        const month = monthsOfTheYear[numberMonth]
        const response = await fetch(`http://localhost:5000/api/budgetGoal?month=${month+1}&year=${year}`,{
            headers: { Authorization: `Bearer ${auth}` },
        })
        const data = await response.json();
        return data
    } catch (error) {
        console.error('Error getting budget goals', error.message);
        throw error;  
    }
}  