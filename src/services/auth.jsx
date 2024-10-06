export const registerUser = async(name, email, password) => {
    try {
        const response = await fetch('http://localhost:5000/api/register', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({ name, email, password }),
        });
    
    if (!response.ok) {
        const errorData = await response.json(); // Intenta obtener los detalles del error
        throw new Error(errorData.message || 'Login failed');
    }
    
    const data = await response.json();
    return data;
    } catch (error)   
    {
        console.error('Error al registrar usuario:', error);
        // Aquí puedes manejar el error de forma más específica, por ejemplo, mostrar un mensaje al usuario
        throw error; // Re-lanzamos el error para que pueda ser capturado en niveles superiores
    }
}

export const userLogin = async (email, password) => {
    try {
        const response = await fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const errorData = await response.json(); 
            throw new Error(errorData.message || 'Login failed');
        }

        const data = await response.json(); 
        return data;
    } catch (error) {
        console.error('Error in userLogin:', error.message); 
        throw error; 
    }
};
