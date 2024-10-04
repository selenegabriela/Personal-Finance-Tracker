export const registerUser = async(name, email, password) => {
    const response = await fetch('http://localhost:5000/api/register',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ name, email, password }),
    }) 
    .then(response => response.json())
    return response
}