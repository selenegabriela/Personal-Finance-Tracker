import { useEffect, useState } from 'react';
import Modal from 'react-modal';


Modal.setAppElement('#root');

const MonthAndYearModal = ({onSave,onClose,isOpen,setCurrentMonth,setCurrentYear,currentMonth,currentYear,months,years,monthJoined,lastMonth}) => {
        const [showMonths, setShowMonths] = useState([])

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

        useEffect(() => {
            console.log('years', years);
            setShowMonths(months.filter((month,i) => {
                if(currentYear>=years[0] && currentYear<=years[years.length-1]){
                    if(currentYear===years[0].toString()){
                        return i>=months.indexOf(monthJoined )
                    } else if (currentYear===years[years.length-1].toString()) {
                        console.log(months.indexOf(lastMonth ), i);
                        return i<months.indexOf(lastMonth )
                    } else {
                        return true
                    }
                }
            }))
        },[currentYear,years,months,monthJoined,lastMonth])

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose}>
            <button onClick={()=>onClose()}>X</button>
            <h2>Change period</h2>
            <form onSubmit={(e)=>onSubmitMonthYear(e)}>

                <select value={currentMonth} onChange={handleOnChangeMonth}>
                    {showMonths?.map((month, i) => (
                        <option value={month} key={i}>{month}</option>
                    ))}
                </select>
                <select value={currentYear} onChange={handleOnChangeYear}>
                    {years && years.map((year, i) => (
                        <option value={year} key={i}>{year}</option>
                    ))}
                </select>
                <button type='submit'>Save</button>
            </form>
        </Modal>
    )
}

export default MonthAndYearModal