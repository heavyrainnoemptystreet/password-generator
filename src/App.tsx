import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PasswordGenerator from './components/PasswordGenerator'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/dashboard' element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/' element={<PasswordGenerator />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
