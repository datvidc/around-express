const router = require('express').Router(); // creating Express Router
const cards = require('../data/cards.json'); // importing user data

router.get('/', (req, res) => {
  res.send(cards);
});

module.exports = router;
