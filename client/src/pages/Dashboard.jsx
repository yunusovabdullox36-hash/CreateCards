import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { cardAPI } from '../api/axios'
import CardRenderer from '../components/CardRenderer'

export default function Dashboard() {
  const [cards, setCards] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const fetchCards = async () => {
    try {
      const res = await cardAPI.getAll()
      setCards(res.data.cards)
    } catch {
      // ignore
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    Promise.resolve().then(() => fetchCards())
  }, [])

  const handleDelete = async (id) => {
    if (!confirm('Cardni o\'chirishni xohlaysizmi?')) return
    try {
      await cardAPI.delete(id)
      setCards(cards.filter((c) => c._id !== id))
    } catch {
      alert('O\'chirishda xatolik')
    }
  }

  if (loading) return <div className="loading">Loading...</div>

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Mening Cardlarim</h2>
        <button className="create-btn" onClick={() => navigate('/create')}>
          + Yangi Card
        </button>
      </div>
      {cards.length === 0 ? (
        <div className="empty-state">
          <p>Hozircha cardlar yo'q</p>
          <button className="create-btn" onClick={() => navigate('/create')}>
            Birinchi cardni yarating
          </button>
        </div>
      ) : (
        <div className="cards-grid">
          {cards.map((card) => (
            <CardRenderer
              key={card._id}
              card={card}
              onDelete={handleDelete}
              onClick={(id) => navigate(`/cards/${id}`)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
