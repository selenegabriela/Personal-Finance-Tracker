import {createContext, useState} from 'react'

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState(null);

    const login = (token) => {
        localStorage.setItem('token', token)
        setAuth(token);
    }

    const logout = () => {
        localStorage.removeItem('token');
        setAuth(null);
    }

    return(
        <AuthContext.Provider value={{auth, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}