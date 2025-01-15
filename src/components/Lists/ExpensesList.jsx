
import { removeExpense } from "../../services/dashboard";

const ExpensesList = ({expense,auth,getAllExpenses,fetchDashboardData}) => {
    
    const {amount, category, date, _id} = expense;
    const handleRemoveExpense = async() => {
        const confirmRemove = window.confirm('Are you sure you want to delete this expense?')

        if(confirmRemove){

            try {
                
                const data = await removeExpense(auth,_id)
                if(data) {
                    await getAllExpenses(auth)
                    await fetchDashboardData(auth)
                    return data
                } 
            } catch (err) {
                throw err.message
            }
        }
    }

    const newDate = new Date(date)
    const formattedDate = newDate.toLocaleDateString('es-MX', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    console.log('props:',expense);
    return (
        <div>
            <div>{category}: ${amount}.00</div>
            <div>Added date: {formattedDate}</div>
            <button>Edit</button>
            <button onClick={() => handleRemoveExpense()}>Remove</button>
            <br />
        </div>
    )
}

export default ExpensesList