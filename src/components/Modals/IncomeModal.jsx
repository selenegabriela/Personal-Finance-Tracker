import { useState } from "react";
import Modal from 'react-modal';
import PropTypes from 'prop-types';

Modal.setAppElement('#root')

const IncomeModal = ({isOpen, onClose, onSave}) => {
    const [amount, setAmount] = useState('')
    const [source, setSource] = useState('')
    const [recurring, setRecurring] = useState(false);

    const handleCheckboxChange = e => {
        setRecurring(e.target.checked)
    }
    const handleSubmit = async(e) => {
        e.preventDefault()
        await onSave({amount,source,recurring})
        onClose();
    }
    return (
        <Modal isOpen={isOpen} onRequestClose={onClose}>
            <button onClick={()=>onClose()}>X</button>
            <h2>Add Income</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Source"
                    value={source}
                    onChange={e => setSource(e.target.value)}
                    required
                />
                <label>
                    <input
                        type="checkbox"
                        checked={recurring}
                        onChange={handleCheckboxChange}   
                    />
                    Montly recurring income
                </label>
                <button type="submit">Save</button>
            </form>
        </Modal>
    )
}

IncomeModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired, 
};

export default IncomeModal