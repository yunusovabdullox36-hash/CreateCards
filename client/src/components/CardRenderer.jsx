import PokemonCard from './PokemonCard'
import CreditCard from './CreditCard'
import BusinessCard from './BusinessCard'
import IdCard from './IdCard'

const CARD_COLORS = {
  pokemon: { bg: '#fff3cd', border: '#ffc107' },
  credit: { bg: '#e8f4fd', border: '#0d6efd' },
  business: { bg: '#f0fdf4', border: '#198754' },
  id: { bg: '#f8f9fa', border: '#6c757d' },
}

export default function CardRenderer({ card, onDelete, onClick }) {
  const colors = CARD_COLORS[card.type] || CARD_COLORS.business

  const renderCard = () => {
    switch (card.type) {
      case 'pokemon': return <PokemonCard data={card} />
      case 'credit': return <CreditCard data={card} />
      case 'business': return <BusinessCard data={card} />
      case 'id': return <IdCard data={card} />
      default: return <div>Unknown card type</div>
    }
  }

  return (
    <div
      className="card-wrapper"
      style={{ borderColor: colors.border }}
      onClick={() => onClick?.(card._id)}
    >
      <div className="card-type-badge" style={{ background: colors.border }}>
        {card.type}
      </div>
      {renderCard()}
      <div className="card-date">
        {new Date(card.createdAt).toLocaleDateString('uz-UZ')}
      </div>
      {onDelete && (
        <button
          className="card-delete-btn"
          onClick={(e) => { e.stopPropagation(); onDelete(card._id) }}
        >
          🗑
        </button>
      )}
    </div>
  )
}
