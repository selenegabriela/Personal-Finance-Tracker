import { useState, useContext } from "react"
import { userLogin } from "../services/auth"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";


const Login = () => {
    const navigate = useNavigate()
    const {login} = useContext(AuthContext)
    const [email, setEmail] = useState('')
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [password, setPassword] = useState('')
    const [error, setError] = useState(''); // State to handle errors
    

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const data = await userLogin(email, password);
            if (data.token) {
                login(data.token); // Autenticar al usuario
                navigate('/dashboard'); // Redirigir al usuario
            } else {
                console.error('No token received:', data);
            }
        } catch (error) {
            console.error('Login error:', error); // Capturar y mostrar el error
            setError(error.message); // Mostrar el mensaje de error en el frontend
        }
    };
    

    return(
        <div>
            <h2>Login</h2>
            <form onSubmit={e => handleSubmit(e)}>
                <input 
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)} 
                />
                <input 
                type={passwordVisible ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)} 
                />
                <span 
                    onMouseDown={() => setPasswordVisible(true)} 
                    onMouseUp={() => setPasswordVisible(false)} 
                    onMouseLeave={() => setPasswordVisible(false)} // Para manejar cuando el mouse sale del ícono
                    className="password-input__icon"
                >
                <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
                </span>
                {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error if any */}
                <button type="submit">Sign in</button>
            </form>
        </div>
    )

}

export default Login