import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'


function App() {

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
        </Routes>
      </Router>
    </AuthProvider>

  )
}

export default App
