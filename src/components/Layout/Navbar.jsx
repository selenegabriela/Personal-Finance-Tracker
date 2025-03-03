import { AuthContext } from "../../context/AuthContext"
import { useNavigate, useLocation } from "react-router-dom"
import { useContext } from "react"

const Navbar = () => {
    const { logout, auth } = useContext(AuthContext)
    const navigate = useNavigate()
    const location = useLocation().pathname

    const routes = {
        "/dashboard": () => {
            logout()
            navigate("/login")
        },
        "/register": () => navigate("/login"),
        "/login": () => navigate("/register"),
    }

    const handleClick = () => {
        routes[location]?.()
    }

    return (
        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
            <button className={`log-reg-button ${auth ? "logout-button" : "register-login-button"}`} onClick={handleClick}>
                {auth ? "Logout" : location === "/login" ? "Register" : "Login"}
            </button>
        </div>
    )
}

export default Navbar
