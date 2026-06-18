const mongoose = require('mongoose');

const CardSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  // Card turi: pokemon | credit | business | id
  type: {
    type: String,
    enum: ['pokemon', 'credit', 'business', 'id'],
    required: true,
  },

  // ── POKEMON CARD ──────────────────────────────
  pokemon: {
    name: String,        // Pikachu
    hp: Number,          // 120
    element: String,     // Fire, Water, Electric...
    attack: String,      // Thunderbolt
    attackDamage: Number,// 90
    rarity: String,      // Common, Rare, Legendary
    description: String,
    imageUrl: String,    // avatar/rasm URL (keyinroq)
  },

  // ── CREDIT CARD ───────────────────────────────
  credit: {
    cardHolder: String,  // JOHN DOE
    cardNumber: String,  // **** **** **** 4242
    expiryDate: String,  // 12/28
    bank: String,        // MyBank
    cardType: String,    // Visa | Mastercard
    color: String,       // gradient rangi
  },

  // ── BUSINESS CARD (Vizitka) ───────────────────
  business: {
    fullName: String,
    position: String,    // CEO, Developer...
    company: String,
    phone: String,
    email: String,
    website: String,
    address: String,
    color: String,
  },

  // ── ID CARD ───────────────────────────────────
  id: {
    fullName: String,
    dateOfBirth: String,
    idNumber: String,
    country: String,
    expiryDate: String,
    photoUrl: String,
  },

}, { timestamps: true, id: false });

module.exports = mongoose.model('Card', CardSchema);