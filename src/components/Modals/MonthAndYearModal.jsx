import Modal from 'react-modal';


Modal.setAppElement('#root');

const MonthAndYearModal = ({onSave,onClose,isOpen,setCurrentMonth,setCurrentYear,currentMonth,currentYear,months,years}) => {


        const handleOnChangeMonth = (e) => {
            setCurrentMonth(e.target.value);
        };
        
        const handleOnChangeYear = (e) => {
            setCurrentYear(e.target.value);
        };
        
        const onSubmitMonthYear = async (e) => {
            e.preventDefault()
            await onSave();
            onClose()
        }

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose}>
            <button onClick={()=>onClose()}>X</button>
            <h2>Change period</h2>
            <form onSubmit={(e)=>onSubmitMonthYear(e)}>

                <select value={currentMonth} onChange={handleOnChangeMonth}>
                    {months?.map((month, i) => (
                        <option value={month} key={i}>{month}</option>
                    ))}
                </select>
                <select value={currentYear} onChange={handleOnChangeYear}>
                    {years?.map((year, i) => (
                        <option value={year} key={i}>{year}</option>
                    ))}
                </select>
                <button type='submit'>Save</button>
            </form>
        </Modal>
    )
}

export default MonthAndYearModal