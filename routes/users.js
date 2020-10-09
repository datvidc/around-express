const fs = require('fs').promises;
const router = require('express').Router(); // creating Express Router
const path = require('path');
const dataBase = path.join(__dirname, '..', 'data', 'users.json');
const User = require('../models/user');
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
  User.find({})
    .then((users) => {
      const userID = users.find((user) => user._id === req.params.id);
      if (userID) {
        return res.send(userID);
      }
      res.status(404).send({ "message": "User ID not found" });
    });
});

router.post('/', (req, res) => {
  console.log(req.body);
  const { name, about, avatar } = req.body; // get name avatar description of the user
  console.log(avatar);

  User.create({ name, about, avatar })
  .then(user => res.send({data: user}))//Returns the data
  //in case of errors
  .catch(err => res.status(500).send(err));


});

module.exports = router;
