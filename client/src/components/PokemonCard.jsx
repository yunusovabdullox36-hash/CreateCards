const ELEMENTS = {
  Fire: '#ff4422',
  Water: '#3399ff',
  Electric: '#ffcc00',
  Grass: '#33cc66',
  Psychic: '#ff66aa',
  Fighting: '#cc4422',
  Dark: '#553344',
  Dragon: '#6644cc',
  Normal: '#aa9966',
}

export default function PokemonCard({ data }) {
  const p = data.pokemon
  const color = ELEMENTS[p?.element] || '#ffcc00'

  return (
    <div className="pokemon-card" style={{ '--element-color': color }}>
      <div className="pokemon-badge">{p?.rarity || 'Common'}</div>
      <div className="pokemon-header">
        <h2 className="pokemon-name">{p?.name || 'Pokemon'}</h2>
        <span className="pokemon-hp">❤️ {p?.hp || '??'}</span>
      </div>
      <div className="pokemon-image">
        {p?.imageUrl ? (
          <img src={p.imageUrl} alt={p.name} />
        ) : (
          <div className="pokemon-placeholder">
            <span className="pokemon-emoji">⚡</span>
          </div>
        )}
      </div>
      <div className="pokemon-info">
        <span className="pokemon-element" style={{ background: color }}>
          {p?.element || 'Normal'}
        </span>
      </div>
      <div className="pokemon-attack">
        <span className="attack-name">{p?.attack || 'Tackle'}</span>
        <span className="attack-damage">{p?.attackDamage || '??'}</span>
      </div>
      {p?.description && <p className="pokemon-desc">{p.description}</p>}
    </div>
  )
}
