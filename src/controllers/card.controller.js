const Card = require('../models/card.model');

const getMyCards = async (req, res) => {
  try {
    const cards = await Card.find({ user: req.user._id }).sort('-createdAt');
    res.json({ success: true, count: cards.length, cards });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createCard = async (req, res) => {
  try {
    const { type, pokemon, credit, business, id } = req.body;

    const card = await Card.create({
      user: req.user._id,
      type,
      pokemon,
      credit,
      business,
      id,
    });

    res.status(201).json({ success: true, card });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/cards/:id — bitta card
const getCard = async (req, res) => {
  try {
    const card = await Card.findOne({ _id: req.params.id, user: req.user._id });
    if (!card) {
      return res.status(404).json({ message: 'Card topilmadi' });
    }
    res.json({ success: true, card });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCard = async (req, res) => {
  try {
    const card = await Card.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!card) {
      return res.status(404).json({ message: 'Card topilmadi' });
    }
    res.json({ success: true, card });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE /api/cards/:id — card o'chirish
const deleteCard = async (req, res) => {
  try {
    const card = await Card.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!card) {
      return res.status(404).json({ message: 'Card topilmadi' });
    }
    res.json({ success: true, message: 'Card o\'chirildi' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getMyCards, createCard, getCard, updateCard, deleteCard };