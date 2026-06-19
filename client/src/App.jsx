import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import PrivateRoute from './components/PrivateRoute'
import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import CreateCard from './pages/CreateCard'
import ViewCard from './pages/ViewCard'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <main className="container">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/create" element={<PrivateRoute><CreateCard /></PrivateRoute>} />
            <Route path="/cards/:id" element={<PrivateRoute><ViewCard /></PrivateRoute>} />
          </Routes>
        </main>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
