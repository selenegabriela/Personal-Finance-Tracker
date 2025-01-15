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

export const getExpenses = async(auth) => {
    try {
        const response = await fetch('http://localhost:5000/api/expenses', {
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

export const getDashboardData = async(auth) => {
    try {
        const response = await fetch('http://localhost:5000/api/dashboard',{
            headers: { Authorization: `Bearer ${auth}` },
        })
        const data = await response.json();
        console.log(auth);
        return data
    } catch (error) {
        console.error('Error getting dashboard', error.message);
        throw error;  
    }
}  

export const getBudgetGoal = async(auth) => {
    try {
        const response = await fetch('http://localhost:5000/api/budgetGoal',{
            headers: { Authorization: `Bearer ${auth}` },
        })
        const data = await response.json();
        return data
    } catch (error) {
        console.error('Error getting budget goals', error.message);
        throw error;  
    }
}  