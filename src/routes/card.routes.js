const express = require('express');
const router = express.Router();
const {
  getMyCards,
  createCard,
  getCard,
  updateCard,
  deleteCard,
} = require('../controllers/card.controller');
const { protect } = require('../middlewares/auth.middleware');

// Barcha card route'lari himoyalangan
router.use(protect);

router.get('/', getMyCards);
router.post('/', createCard);
router.get('/:id', getCard);
router.put('/:id', updateCard);
router.delete('/:id', deleteCard);

module.exports = router;