import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'


function App() {

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
        </Routes>
      </Router>
    </AuthProvider>

  )
}

export default App
