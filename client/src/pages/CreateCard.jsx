import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { cardAPI } from '../api/axios'

const CARD_TYPES = [
  { value: 'pokemon', label: 'Pokemon Card' },
  { value: 'credit', label: 'Credit Card' },
  { value: 'business', label: 'Business Card' },
  { value: 'id', label: 'ID Card' },
]

const INITIAL = {
  pokemon: {
    pokemon: { name: '', hp: '', element: 'Electric', attack: '', attackDamage: '', rarity: 'Common', description: '', imageUrl: '' },
  },
  credit: {
    credit: { cardHolder: '', cardNumber: '', expiryDate: '', bank: '', cardType: 'Visa', color: '#1a1a2e' },
  },
  business: {
    business: { fullName: '', position: '', company: '', phone: '', email: '', website: '', address: '', color: '#0f3460' },
  },
  id: {
    id: { fullName: '', dateOfBirth: '', idNumber: '', country: 'Uzbekistan', expiryDate: '' },
  },
}

export default function CreateCard() {
  const [type, setType] = useState('pokemon')
  const [form, setForm] = useState(INITIAL.pokemon)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleTypeChange = (newType) => {
    setType(newType)
    setForm(INITIAL[newType])
    setError('')
  }

  const handleChange = (key, value) => {
    const section = Object.keys(form)[0]
    setForm({ [section]: { ...form[section], [key]: value } })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const payload = { type, ...form }
      await cardAPI.create(payload)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Xatolik yuz berdi')
    }
  }

  const renderFields = () => {
    const data = form[Object.keys(form)[0]]

    switch (type) {
      case 'pokemon':
        return (
          <>
            <input placeholder="Name" value={data.name || ''} onChange={(e) => handleChange('name', e.target.value)} required />
            <input type="number" placeholder="HP" value={data.hp || ''} onChange={(e) => handleChange('hp', +e.target.value)} />
            <select value={data.element || 'Electric'} onChange={(e) => handleChange('element', e.target.value)}>
              {['Electric', 'Fire', 'Water', 'Grass', 'Psychic', 'Fighting', 'Dark', 'Dragon', 'Normal'].map((el) => (
                <option key={el}>{el}</option>
              ))}
            </select>
            <input placeholder="Attack Name" value={data.attack || ''} onChange={(e) => handleChange('attack', e.target.value)} />
            <input type="number" placeholder="Attack Damage" value={data.attackDamage || ''} onChange={(e) => handleChange('attackDamage', +e.target.value)} />
            <select value={data.rarity || 'Common'} onChange={(e) => handleChange('rarity', e.target.value)}>
              {['Common', 'Rare', 'Legendary'].map((r) => (<option key={r}>{r}</option>))}
            </select>
            <textarea placeholder="Description" value={data.description || ''} onChange={(e) => handleChange('description', e.target.value)} />
          </>
        )
      case 'credit':
        return (
          <>
            <input placeholder="Card Holder (e.g. ALI VALIYEV)" value={data.cardHolder || ''} onChange={(e) => handleChange('cardHolder', e.target.value)} required />
            <input placeholder="Card Number (e.g. 4242 4242 4242 4242)" value={data.cardNumber || ''} onChange={(e) => handleChange('cardNumber', e.target.value)} />
            <input placeholder="Expiry Date (12/28)" value={data.expiryDate || ''} onChange={(e) => handleChange('expiryDate', e.target.value)} />
            <input placeholder="Bank Name" value={data.bank || ''} onChange={(e) => handleChange('bank', e.target.value)} />
            <select value={data.cardType || 'Visa'} onChange={(e) => handleChange('cardType', e.target.value)}>
              {['Visa', 'Mastercard', 'UzCard', 'Humo'].map((t) => (<option key={t}>{t}</option>))}
            </select>
            <input type="color" value={data.color || '#1a1a2e'} onChange={(e) => handleChange('color', e.target.value)} />
          </>
        )
      case 'business':
        return (
          <>
            <input placeholder="Full Name" value={data.fullName || ''} onChange={(e) => handleChange('fullName', e.target.value)} required />
            <input placeholder="Position" value={data.position || ''} onChange={(e) => handleChange('position', e.target.value)} />
            <input placeholder="Company" value={data.company || ''} onChange={(e) => handleChange('company', e.target.value)} />
            <input placeholder="Phone" value={data.phone || ''} onChange={(e) => handleChange('phone', e.target.value)} />
            <input type="email" placeholder="Email" value={data.email || ''} onChange={(e) => handleChange('email', e.target.value)} />
            <input placeholder="Website" value={data.website || ''} onChange={(e) => handleChange('website', e.target.value)} />
            <input placeholder="Address" value={data.address || ''} onChange={(e) => handleChange('address', e.target.value)} />
            <input type="color" value={data.color || '#0f3460'} onChange={(e) => handleChange('color', e.target.value)} />
          </>
        )
      case 'id':
        return (
          <>
            <input placeholder="Full Name" value={data.fullName || ''} onChange={(e) => handleChange('fullName', e.target.value)} required />
            <input placeholder="Date of Birth (01.01.1995)" value={data.dateOfBirth || ''} onChange={(e) => handleChange('dateOfBirth', e.target.value)} />
            <input placeholder="ID Number (AA1234567)" value={data.idNumber || ''} onChange={(e) => handleChange('idNumber', e.target.value)} />
            <input placeholder="Country" value={data.country || 'Uzbekistan'} onChange={(e) => handleChange('country', e.target.value)} />
            <input placeholder="Expiry Date (01.01.2030)" value={data.expiryDate || ''} onChange={(e) => handleChange('expiryDate', e.target.value)} />
          </>
        )
    }
  }

  return (
    <div className="create-card-page">
      <form className="create-card-form" onSubmit={handleSubmit}>
        <h2>Yangi Card yaratish</h2>
        {error && <div className="auth-error">{error}</div>}
        <div className="type-selector">
          {CARD_TYPES.map((t) => (
            <button
              key={t.value}
              type="button"
              className={`type-btn ${type === t.value ? 'active' : ''}`}
              onClick={() => handleTypeChange(t.value)}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="form-fields">{renderFields()}</div>
        <button type="submit" className="auth-btn">Yaratish</button>
      </form>
    </div>
  )
}
