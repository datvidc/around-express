const fs = require('fs').promises;
const router = require('express').Router(); // creating Express Router
const path = require('path');
const dataBase = path.join(__dirname, '..', 'data', 'users.json');

function getData(dataPath) {
  return fs.readFile(dataPath, { enconding: 'utf-8' })
    .then(JSON.parse)
    .catch((err) => {
      res.status(500).send({message: err})
    });
}

//get request to users
router.get('/', (req, res) => {
  getData(dataBase)
    .then((users) => {
      res.send(users);
    });
});

// get request for /users/:id
router.get('/:id', (req, res) => {
  getData(dataBase)
    .then((users) => {
      const userID = users.find((user) => user._id === req.params.id);
      if (userID) {
        return res.send(userID);
      }
      res.status(404).send({ "message": "User ID not found" });
    });
});

module.exports = router;
