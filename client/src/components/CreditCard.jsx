export default function CreditCard({ data }) {
  const c = data.credit
  const color = c?.color || '#1a1a2e'

  return (
    <div className="credit-card" style={{ background: `linear-gradient(135deg, ${color}, #000)` }}>
      <div className="credit-chip">
        <div className="chip-inner" />
      </div>
      <div className="credit-type">{c?.cardType || 'VISA'}</div>
      <div className="credit-number">
        {c?.cardNumber || '**** **** **** ****'}
      </div>
      <div className="credit-footer">
        <div>
          <span className="credit-label">Card Holder</span>
          <span className="credit-value">{c?.cardHolder || 'YOUR NAME'}</span>
        </div>
        <div>
          <span className="credit-label">Expires</span>
          <span className="credit-value">{c?.expiryDate || '00/00'}</span>
        </div>
      </div>
      {c?.bank && <div className="credit-bank">{c.bank}</div>}
    </div>
  )
}
