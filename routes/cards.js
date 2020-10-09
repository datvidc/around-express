const router = require('express').Router(); // creating Express Router
const card = require('../controllers/cards');

router.get('/', (req, res) => {
  card.returnCards(req, res);
});

router.post('/', (req, res) => {
  card.createCard(req, res);
});

router.delete('/:cardId', (req, res) => {
  card.deleteCard(req, res);
});

router.put('/:cardId/likes', (req, res) => {
  card.likeCard(req, res);
});

router.delete('/:cardId/likes', (req, res) => {
  card.dislikeCard(req, res);
})


module.exports = router;
