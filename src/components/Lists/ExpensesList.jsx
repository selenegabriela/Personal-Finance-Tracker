
import { useState } from "react";
import { removeExpense,updateExpense  } from "../../services/dashboard";
import EditExpenseModal from "../Modals/EditExpenseModal";

const ExpensesList = ({expense,auth,getAllExpenses,fetchDashboardData}) => {
    const [isEditExpenseModalOpen,setIsEditExpenseModalOpen] = useState(false)
    const {amount, category, date, _id} = expense;

    const handleEditExpense = async(editedExpense) => {
        try {
            const data = await updateExpense(editedExpense,_id,auth)

            if(data){
                await fetchDashboardData()
                await getAllExpenses()                
            }
        } catch (err) {
            console.error('Adding income error:', err);
            //setError(err.message);            
        }
    }
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
    return (
        <div>
            <EditExpenseModal
                expense = {expense}
                isOpen = {isEditExpenseModalOpen}
                onClose={()=>setIsEditExpenseModalOpen(false)}
                onSave={handleEditExpense}
            />
            <center style={{padding: '10px',fontWeight: 'bold', borderRadius: "5px", border: "1px solid #c7c417", margin: '0 auto'}}>

            <div>{category}: ${amount}.00</div>
            <div>Added date: {formattedDate}</div>
            <div style={{display: 'flex', gap: '10px', justifyContent: 'center'}}>
                <button className="blue-button" onClick={()=>setIsEditExpenseModalOpen(true)}>Edit</button>
                <button className="blue-button red-button" onClick={() => handleRemoveExpense()}>Remove</button>
            </div>
            </center>
            <br />
        </div>
    )
}

export default ExpensesList