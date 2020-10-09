const fs = require('fs').promises;
const router = require('express').Router(); // creating Express Router
const path = require('path');
const users = require('../controllers/users');


function getData(dataPath) {
  return fs.readFile(dataPath, { enconding: 'utf-8' })
    .then(JSON.parse)
    .catch((err) => {
      res.status(500).send({message: err})
    });
}

//get request to users
router.get('/', (req, res) => {
  users.returnAllUsers(req, res);
});

// get request for /users/:id
router.get('/:id', (req, res) => {
  users.getUserById(req, res);


});
router.post('/', (req, res) => {
  users.createNewUser(req, res); // Setting up new user
});

module.exports = router;
