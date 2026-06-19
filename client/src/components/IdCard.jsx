export default function IdCard({ data }) {
  const id = data.id

  return (
    <div className="id-card">
      <div className="id-header">
        <div className="id-flag">🇺🇿</div>
        <span className="id-title">IDENTITY CARD</span>
      </div>
      <div className="id-body">
        <div className="id-photo">
          {id?.photoUrl ? (
            <img src={id.photoUrl} alt={id.fullName} />
          ) : (
            <div className="id-photo-placeholder">
              <span>📷</span>
            </div>
          )}
        </div>
        <div className="id-info">
          <div className="id-field">
            <span className="id-label">Full Name</span>
            <span className="id-value">{id?.fullName || 'Full Name'}</span>
          </div>
          <div className="id-field">
            <span className="id-label">Date of Birth</span>
            <span className="id-value">{id?.dateOfBirth || '00.00.0000'}</span>
          </div>
          <div className="id-field">
            <span className="id-label">ID Number</span>
            <span className="id-value">{id?.idNumber || 'AA0000000'}</span>
          </div>
          <div className="id-field">
            <span className="id-label">Country</span>
            <span className="id-value">{id?.country || 'Uzbekistan'}</span>
          </div>
          {id?.expiryDate && (
            <div className="id-field">
              <span className="id-label">Expiry Date</span>
              <span className="id-value">{id.expiryDate}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
