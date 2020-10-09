const router = require('express').Router(); // creating Express Router
const users = require('../controllers/users');

//get request to users
router.get('/', (req, res) => {
  users.returnAllUsers(req, res);
});

router.patch('/me', (req, res) => {
users.updateUser(req, res);
})

router.patch('/me/avatar', (req, res) => {
  users.updateAvatar(req, res);
})


// get request for /users/:id
router.get('/:id', (req, res) => {
  users.getUserById(req, res);
});

router.post('/', (req, res) => {
  users.createNewUser(req, res); // Setting up new user
});

module.exports = router;
