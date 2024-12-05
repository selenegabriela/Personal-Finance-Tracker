export const addIncome = async(incomeData,auth) => {

    try {
        const response = await fetch('http://localhost:5000/api/incomes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${auth.token}` },
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
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${auth.token}` },
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

export const getDashboardData = async(auth) => {
    try {
        const response = await fetch('http://localhost:5000/api/dashboard',{
            headers: { Authorization: `Bearer ${auth.token}` },
        })
        const data = await response.json();
        return data
    } catch (error) {
        console.error('Error getting dashboard', error.message);
        throw error;  
    }
}  