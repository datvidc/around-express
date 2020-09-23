const router = require('express').Router(); // creating Express Router
const users = require('../data/users.json'); // importing user data

//get request to users
router.get('/', (req, res) => {
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
