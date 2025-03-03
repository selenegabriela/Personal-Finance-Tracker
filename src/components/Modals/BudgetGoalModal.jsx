import {useState,useContext} from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import { updateBudgetGoals } from '../../services/dashboard';
import { AuthContext } from '../../context/AuthContext';

Modal.setAppElement('#root');

const BudgetGoalModal = ({isOpen,onClose,onSave,dataBudgetGoals,fetchDashboardData}) => {
    const { auth } = useContext(AuthContext);
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');

    const currentDate = new Date()
    const currentMonth = currentDate.getMonth()
    const currentYear = currentDate.getFullYear()

    const normalizeText = (text) => text.trim().toLowerCase();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const normalizedCategory = normalizeText(category);
        const foundGoal = dataBudgetGoals?.find(goal => normalizeText(goal.category) === normalizedCategory && currentYear === new Date(goal.date).getFullYear() && currentMonth === new Date(goal.date).getMonth());

        if (foundGoal) {
          const confirmEdit = window.confirm(`The category "${foundGoal.category}" already exists for this month with a budget of ${foundGoal.amount}. Do you want to edit it with the new amount?`);


          if (confirmEdit) {
            const {category} = foundGoal
            const data = await updateBudgetGoals({amount,category},foundGoal._id,auth)
            if(data) {
              await fetchDashboardData()
          } else {
              console.log('Error adding income')
          }
            onClose();
            return
          }
        }
        await onSave({amount,category});
        onClose();
    }

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose}>
            <div className="login-container modals">

                <button className="cross" onClick={()=>onClose()}>X</button>
                <h2>Add Budget</h2>
                <form className='form' onSubmit={handleSubmit}>
                    <input
                        type="number"
                        placeholder='Amount'
                        value={amount}
                        onChange={e => setAmount(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder='Category'
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                        required
                    />
                    <button className="save" type="submit">Save</button>
                </form>
                
            </div>

        </Modal>
    )
}

export default BudgetGoalModal