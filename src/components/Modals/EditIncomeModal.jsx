import { useState,useEffect } from "react";
import Modal from 'react-modal';

Modal.setAppElement('#root');

const EditIncomeModal = ({isOpen,onClose,onSave,income}) => {
    const [amount, setAmount] = useState('');
    const [source, setSource] = useState('');
    const [recurring, setRecurring] = useState('');

    const handleCheckboxChange = e => {
        setRecurring(e.target.checked)
    }
    const handleSubmit = async(e) => {
        e.preventDefault()
        await onSave({amount,source,recurring})
        onClose()
    }

    useEffect(()=>{
        setAmount(income.amount)
        setSource(income.source)
        setRecurring(income.recurring)
    },[income])

    return(
        <Modal isOpen={isOpen} onRequestClose={onClose}>
            <h2>Edit income</h2>
            <form onSubmit={(e)=>handleSubmit(e)}>
            <input
                    type="number"
                    placeholder='Amount'
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder='Source'
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

export default EditIncomeModal