import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { cardAPI } from '../api/axios'
import CardRenderer from '../components/CardRenderer'

export default function ViewCard() {
  const { id } = useParams()
  const [card, setCard] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    cardAPI.getOne(id)
      .then((res) => setCard(res.data.card))
      .catch(() => navigate('/dashboard'))
      .finally(() => setLoading(false))
  }, [id, navigate])

  const handleDelete = async () => {
    if (!confirm('Cardni o\'chirishni xohlaysizmi?')) return
    try {
      await cardAPI.delete(id)
      navigate('/dashboard')
    } catch {
      alert('Xatolik')
    }
  }

  if (loading) return <div className="loading">Loading...</div>
  if (!card) return null

  return (
    <div className="view-card-page">
      <button className="back-btn" onClick={() => navigate('/dashboard')}>
        ← Back
      </button>
      <CardRenderer card={card} onDelete={handleDelete} />
    </div>
  )
}
