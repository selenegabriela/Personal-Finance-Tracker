import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Register from './pages/Register.jsx'



function App() {

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/register" element={<Register/>}/>
        </Routes>
      </Router>
    </AuthProvider>

  )
}

export default App
