import { useEffect, useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const MonthAndYearModal = ({ onSave, onClose, isOpen, setCurrentMonth, setCurrentYear, currentMonth, currentYear, months, years, monthJoined, lastMonth }) => {
    const [showMonths, setShowMonths] = useState([]);
    const [tempMonth, setTempMonth] = useState("");
    const [tempYear, setTempYear] = useState("");
    const [shouldSave, setShouldSave] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setTempMonth(currentMonth);
            setTempYear(currentYear);
        }
    }, [isOpen, currentMonth, currentYear]);

    const handleOnChangeMonth = (e) => {
        setTempMonth(e.target.value);
    };

    const handleOnChangeYear = (e) => {
        setTempYear(e.target.value);
    };

    const onSubmitMonthYear = (e) => {
        e.preventDefault();
        setCurrentMonth(tempMonth);
        setCurrentYear(tempYear);
        setShouldSave(true); 
        onClose();
    };

    useEffect(() => {
        if (shouldSave) {
            onSave(); 
            setShouldSave(false);
        }
    }, [currentMonth, currentYear, shouldSave, onSave]);

    useEffect(() => {
        if (!tempYear) return;
        
        const filteredMonths = months.filter((month, i) => {
            if (tempYear >= years[0] && tempYear <= years[years.length - 1]) {
                if (tempYear.toString() === years[0].toString()) {
                    return i >= months.indexOf(monthJoined);
                } else if (tempYear.toString() === years[years.length - 1].toString()) {
                    return i < months.indexOf(lastMonth);
                } else {
                    return true;
                }
            }
            return false;
        });
    
        setShowMonths(filteredMonths);
    
        if (!filteredMonths.includes(tempMonth)) {
            setTempMonth(filteredMonths[0]);
        }
    }, [tempYear, years, months, monthJoined, lastMonth, tempMonth]);
    
    return (
        <Modal isOpen={isOpen} onRequestClose={onClose}>
            <div className="login-container modals">
                <button className="cross" onClick={onClose}>X</button>
                <h2>Change period</h2>
                <form className='form' onSubmit={onSubmitMonthYear}>
                    <select value={tempMonth} onChange={handleOnChangeMonth}>
                        {showMonths?.map((month, i) => (
                            <option value={month} key={i}>{month}</option>
                        ))}
                    </select>
                    <select value={tempYear} onChange={handleOnChangeYear}>
                        {years?.map((year, i) => (
                            <option value={year} key={i}>{year}</option>
                        ))}
                    </select>
                    <button className="save" type='submit'>Save</button>
                </form>
            </div>
        </Modal>
    );
};

export default MonthAndYearModal;
