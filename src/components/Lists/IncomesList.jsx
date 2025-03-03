

import { useState } from "react";
import { removeIncome, updateIncome  } from "../../services/dashboard";
import EditIncomeModal from "../Modals/EditIncomeModal";

const IncomesList = ({income,auth,getAllIncomes,fetchDashboardData}) => {
    const [isEditIncomeModalOpen,setIsEditIncomeModalOpen] = useState(false)
    const {amount, source, date, _id} = income;

    const handleEditIncome = async(editedIncome) => {
       try {
           const data = await updateIncome(editedIncome,_id,auth)

           if(data){
               await fetchDashboardData()
               await getAllIncomes()                
           }
       } catch (err) {
           console.error('Adding income error:', err);
           //setError(err.message);            
       }
    }
    const handleRemoveIncome = async() => {
        const confirmRemove = window.confirm('Are you sure you want to delete this income?')

        if(confirmRemove){

            try {
                
                const data = await removeIncome(auth,_id)
                if(data) {
                    await getAllIncomes(auth)
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
            <EditIncomeModal
                income = {income}
                isOpen = {isEditIncomeModalOpen}
                onClose={()=>setIsEditIncomeModalOpen(false)}
                onSave={handleEditIncome}
            />
            <center style={{padding: '10px',fontWeight: 'bold', borderRadius: "5px", border: "1px solid #c7c417", margin: '0 auto'}}>
            <div>{source}: ${amount}.00</div>
            <div>Added date: {formattedDate}</div>
            <div style={{display: 'flex', gap: '10px', justifyContent: 'center'}}>
                <button className="blue-button" onClick={()=>setIsEditIncomeModalOpen(true)}>Edit</button>
                <button className="blue-button red-button" onClick={() => handleRemoveIncome()}>Remove</button>
            </div>
            </center>
            <br />
        </div>
    )
}

export default IncomesList