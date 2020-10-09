const User = require('../models/user.js');

module.exports.returnAllUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users)
    })
    .catch(err => res.status(500).send({ "message": "An error occurred" }));
};

module.exports.createNewUser = (req, res) => {
  const { name, about, avatar } = req.body; // get name avatar description of the user
  User.create({ name, about, avatar })
.then(user => res.send({data: user}))//Returns the data
  //in case of errors
.catch(err => res.status(500).send({"message": "An error occurred"}));
}

module.exports.getUserById = (req, res) => {
  let userId = req.params.id;
  User.findById(userId)
    .then((user) => {
      if (user) {
        return res.send(user);
      } else {
        return res.status(404).send({"message": "User Not Found"});
      }
    })
    .catch((err) => {

      res.status(500).send({ "message": "An error occurred" });
    })
};