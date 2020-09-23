const userRouter = require('express').Router(); // creating Express Router
const { users } = require('../data/users.json'); // importing user data



router.get('/users/:id', (req, res) => {
  if (!users._id === req.params.id) {
    res.status(404).send({ "message": "User ID not found" });
  }

  const { user } = users.filter(user => user._id === req.params.id);

  res.send(user);
});

module.exports = {
    userRouter; // exporting

};