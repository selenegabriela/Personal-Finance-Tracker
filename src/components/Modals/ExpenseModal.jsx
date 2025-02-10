import {useState} from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';

Modal.setAppElement('#root');

const ExpenseModal = ({isOpen, onClose, onSave, dataBudgetGoals}) => {
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    console.log('dataBurget;', dataBudgetGoals);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await onSave({amount,category});
        onClose();
        setAmount('')
        setCategory('')
    }

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose}>
            <button onClick={()=>onClose()}>X</button>
            <h2>Add Expense</h2>
            <form onSubmit={handleSubmit}>
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
                    list="category-suggestions"
                    required
                />
                <datalist id="category-suggestions">
                    {dataBudgetGoals?.map((budgetGoal,i) => (
                        <option key={i} value={budgetGoal.category} />
                    ))}
                </datalist>
                <button type="submit">Save</button>
            </form>
            

        </Modal>
    )
}

ExpenseModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired, 
};

export default ExpenseModal