import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { registerUser } from "../services/auth";
import { useNavigate } from 'react-router-dom';

const validate = (input) => {
    const errors = {}
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const regexPassword = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W]).{8,}$/;

    if(input.name.length < 3) errors.name = 'Name should be at least 3 characters long.';
    if(!regexEmail.test(input.email)) errors.email = 'Invalid email'
    if(!regexPassword.test(input.password)) errors.password = 'The password must be at least 8 characters long, including a number, an uppercase letter, a lowercase letter, and a special character.'
    return errors;
}

const Register = () => {
    const navigate = useNavigate()
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [errors, setErrors] = useState({})
    const [input,setInput] = useState({
        name: '',
        email: '',
        password: ''
    })

    const handleOnChange = (e) => {
        e.preventDefault();
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        const {name,email,password} = input
        const data = await registerUser(name,email,password)

        if (data.token) {
            navigate('/login'); // Redirige al login después de registrarse
        }
    }

    return(
        <div>
            <div className="login-container">
                <h2>Register</h2>
                <form className='form' onSubmit={e => handleSubmit(e)}>
                    <input 
                    name='name' 
                    value={input.name} 
                    type='text' placeholder='User name' 
                    onChange={e => handleOnChange(e)}/>
                    {
                        errors.name && <p style={{ color: 'red' }}>{errors.name}</p>
                    }
                    <input 
                    name='email' 
                    value={input.email} 
                    type='email' 
                    placeholder='Email' 
                    onChange={e => handleOnChange(e)}/>
                    {
                        errors.email && <p style={{ color: 'red' }}>{errors.email}</p>
                    }
                    <div className="password password-input">
                        <input
                            name="password"
                            value={input.password}
                            type={passwordVisible ? "text" : "password"}
                            placeholder="Password"
                            onChange={e => handleOnChange(e)}
                            className="password-input__input"
                            />
                        <span 
                            onMouseDown={() => setPasswordVisible(true)} 
                            onMouseUp={() => setPasswordVisible(false)} 
                            onMouseLeave={() => setPasswordVisible(false)} // Para manejar cuando el mouse sale del ícono
                            className="password-input__icon"
                            >
                        <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
                        </span>
                    </div>
                    {
                        errors.password && <p style={{ color: 'red' }}>{errors.password}</p>
                    }
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    )
}

export default Register;