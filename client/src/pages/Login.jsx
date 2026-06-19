import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await login(form.email, form.password)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Xatolik yuz berdi')
    }
  }

  return (
    <div className="auth-page">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Kirish</h2>
        {error && <div className="auth-error">{error}</div>}
        <input
          type="email" placeholder="Email" required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password" placeholder="Parol" required
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button type="submit" className="auth-btn">Kirish</button>
        <p className="auth-link">
          Akkountingiz yo'qmi? <Link to="/register">Ro'yxatdan o'tish</Link>
        </p>
      </form>
    </div>
  )
}
