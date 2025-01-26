import {useState} from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';

Modal.setAppElement('#root');

const BudgetGoalModal = ({isOpen,onClose,onSave}) => {
    const options = ['daily', 'weekly', 'monthly', 'yearly'];
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [period, setPeriod] = useState('');

    const handleChange = (event) => {
        const value = event.target.value;
        setPeriod(value);

      };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        await onSave({amount,category,period});
        onClose();
    }

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose}>
            <h2>Add Budget</h2>
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
                <select
                  id="period"
                  value={period}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="" disabled>
                    -- Choose an option --
                  </option>
                  {options.map((option) => (
                    <option key={option} value={option}>
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </option>
                  ))}
                </select>
                <button type="submit">Save</button>
            </form>
            

        </Modal>
    )
}

export default BudgetGoalModal