const router = require('express').Router(); // creating Express Router
const path = require('path');
const fs = require('fs').promises;
const dataPath = path.join(__dirname, '..', 'data', 'cards.json');

function getCards(path) {
  return fs.readFile(path, { enconding: 'utf-8' })
    .then(JSON.parse)
    .catch((err) => console.log(err));
}

router.get('/', (req, res) => {
  getCards(dataPath)
      .then((cards) => {
        res.send(cards);
      });

});

module.exports = router;
