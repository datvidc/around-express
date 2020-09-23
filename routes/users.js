const fs = require('fs').promises;
const router = require('express').Router(); // creating Express Router
const path = require('path');
const dataBase = path.join(__dirname, '..', 'data', 'users.json');
const users = require('../data/users.json'); // importing user data

function getData(path) {
  return fs.readFile(path, { enconding: 'utf-8' })
    .then(JSON.parse)
    .catch(err => console.log(err));
}


//get request to users
router.get('/', (req, res) => {
  getData(dataBase)
    .then(users)
    res.send(users);
});

 // get request for /users/:id
 router.get('/:id', (req, res) => {
  let userID = users.find((user) => user._id === req.params.id);
  if (userID) {
    res.send(userID);
  }
   res.status(404).send({ "message": "User ID not found" });
});

module.exports = router;
