const User = require('../models/user.js');


module.exports.returnAllUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users)
    })
    .catch(err => res.status(500).send({ message: 'What did you do This time ??' }));
};

module.exports.getUserById = (req, res) => {

}