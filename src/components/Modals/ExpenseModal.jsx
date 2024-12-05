import {useState} from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';

Modal.setAppElement('#root');

const ExpenseModal = ({isOpen, onClose, onSave}) => {
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await onSave({amount,category});
        onClose();
    }

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose}>
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
                    required
                />

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