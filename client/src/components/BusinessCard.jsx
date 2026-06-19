export default function BusinessCard({ data }) {
  const b = data.business
  const color = b?.color || '#0f3460'

  return (
    <div className="business-card" style={{ borderTop: `4px solid ${color}` }}>
      <div className="business-header">
        <h3 className="business-name">{b?.fullName || 'Full Name'}</h3>
        <span className="business-position" style={{ color }}>
          {b?.position || 'Position'}
        </span>
      </div>
      <div className="business-company">{b?.company || 'Company'}</div>
      <div className="business-divider" style={{ background: color }} />
      <div className="business-details">
        {b?.phone && <div>📞 {b.phone}</div>}
        {b?.email && <div>✉️ {b.email}</div>}
        {b?.website && <div>🌐 {b.website}</div>}
        {b?.address && <div>📍 {b.address}</div>}
      </div>
    </div>
  )
}
