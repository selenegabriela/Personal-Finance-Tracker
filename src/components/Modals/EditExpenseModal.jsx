import { useState,useEffect } from "react";
import Modal from 'react-modal';

Modal.setAppElement('#root');

const EditExpenseModal = ({isOpen,onClose,onSave,expense}) => {
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault()
        await onSave({amount,category})
        onClose()
    }

    useEffect(()=>{
        setAmount(expense.amount)
        setCategory(expense.category)
    },[expense])

    return(
        <Modal isOpen={isOpen} onRequestClose={onClose}>
            <div className="login-container modals">

                <button className="cross" onClick={()=>onClose()}>X</button>
                <h2>Edit expense</h2>
                <form className='form' onSubmit={(e)=>handleSubmit(e)}>
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

export default EditExpenseModal