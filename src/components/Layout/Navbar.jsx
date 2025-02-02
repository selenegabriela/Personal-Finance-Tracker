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
        <div>
            <button onClick={handleClick}>
                {auth ? "Logout" : location === "/login" ? "Register" : "Login"}
            </button>
        </div>
    )
}

export default Navbar
