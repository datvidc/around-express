const router = require('express').Router(); // creating Express Router
const path = require('path');
const fs = require('fs').promises;
const Cards = require('../models/card');
const card = require('../controllers/cards');



router.get('/', (req, res) => {
  card.returnCards(req, res);
});

router.post('/', (req, res) => {
  card.createCard(req, res);
});




module.exports = router;
