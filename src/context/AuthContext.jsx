import {createContext, useState, useEffect} from 'react'

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState(null);
    const [monthJoined, setMonthJoined] = useState('')
    const [years, setYears] = useState([])

    const login = (token) => {
        localStorage.setItem('token', token)
        setAuth(token);
    }

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('years')
        localStorage.removeItem('monthJoined')
        setAuth(null);
        setMonthJoined('')
        setYears([])
    }

    const getJoinInfo = (years,monthJoined) => {
        localStorage.setItem('years', JSON.stringify(years))
        localStorage.setItem('monthJoined', JSON.stringify(monthJoined))
        setMonthJoined(monthJoined)
        setYears(years)
    }

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setAuth(storedToken);
        }
    }, []);
    useEffect(() => {
        const storedYears = localStorage.getItem('years')
        const arrYears = JSON.parse(storedYears)

        if (arrYears?.length) {
            setYears(arrYears);
        }
        const storedMonthJoined = localStorage.getItem('monthJoined');
        const strMonth = JSON.parse(storedMonthJoined)
        if (storedMonthJoined) {
            setMonthJoined(strMonth);

        }
    }, []);

    return(
        <AuthContext.Provider value={{auth, login, logout, getJoinInfo, years, monthJoined}}>
            {children}
        </AuthContext.Provider>
    )
}