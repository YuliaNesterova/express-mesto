const router = require('express').Router();
const getCards = require('../controllers/cards');

const cards = require('../data/cards.json');

router.get('/cards', getCards);

module.exports = router;