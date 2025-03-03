
import { useState } from "react";
import { removeBudgetGoal,updateBudgetGoals  } from "../../services/dashboard";
import EditBudgetGoalsModal from "../Modals/EditBudgetGoalsModal";

const BudgetGoalsList = ({budgetGoal,auth,getAllBudgetGoals,fetchDashboardData}) => {
    const [isEditBudgetGoalsModalOpen,setIsEditBudgetGoalsModalOpen] = useState(false)
    const {amount, category, date, _id} = budgetGoal;

    const handleEditBudgetGoals = async(editedBudgetGoals) => {
        try {
            const data = await updateBudgetGoals(editedBudgetGoals,_id,auth)

            if(data){
                await fetchDashboardData()
                await getAllBudgetGoals()                
            }
        } catch (err) {
            console.error('Adding income error:', err);
            //setError(err.message);            
        }
    }
    const handleRemoveBudgetGoal = async() => {
        const confirmRemove = window.confirm('Are you sure you want to delete this budgetGoals?')

        if(confirmRemove){

            try {
                
                const data = await removeBudgetGoal(auth,_id)
                if(data) {
                    await getAllBudgetGoals(auth)
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
            <EditBudgetGoalsModal
                budgetGoal = {budgetGoal}
                isOpen = {isEditBudgetGoalsModalOpen}
                onClose={()=>setIsEditBudgetGoalsModalOpen(false)}
                onSave={handleEditBudgetGoals}
            />
            <center style={{padding: '10px',fontWeight: 'bold', borderRadius: "5px", border: "1px solid #c7c417", margin: '0 auto'}}>
            <div>{category}: ${amount}.00</div>
            <div>Added date: {formattedDate}</div>
            <div style={{display: 'flex', gap: '10px', justifyContent: 'center'}}>
                <button className="blue-button" onClick={()=>setIsEditBudgetGoalsModalOpen(true)}>Edit</button>
                <button className="blue-button red-button" onClick={() => handleRemoveBudgetGoal()}>Remove</button>
            </div>
            </center>    
            <br />
        </div>
    )
}

export default BudgetGoalsList