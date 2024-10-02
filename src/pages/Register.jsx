import { useState } from "react";
import { useNavigate } from "react-router-dom";

const validate = (input) => {
    const errors = {}
    const regexEmail = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$")
    const regexPassword = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$")
    if(input.name.length < 4) errors.name = 'Name should be at least 3 characters long.';
    if(!regexEmail.test(input.email)) errors.email = 'Invalid email'
    if(!regexPassword.test(input.password)) errors.email = 'The password must be at least 8 characters long, including a number, an uppercase letter, a lowercase letter, and a special character.'
    return errors;
}

const Register = () => {
    const [errors, setErrors] = useState({})
    const [input,setInput] = useState({
        name: '',
        email: '',
        password: ''
    })

    return(
        <div>
            <form>
                <label>User name: </label>
                <input name='name' value={input.name} type='text' placeholder='User name'/>
                {
                    errors.name && <label>errors.name</label>
                }
                <label>Email: </label>
                <input name='email' value={input.email} type='email' placeholder='Email'/>
                {
                    errors.email && <label>errors.email</label>
                }
                <label>Password: </label>
                <input name='password' value={input.password} type='password' placeholder='Password'/>
                {
                    errors.password && <label>errors.password</label>
                }
            </form>
        </div>
    )
}

export default Register;