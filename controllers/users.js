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


module.exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(req.user._id, {
    name: req.body.name,
    about: req.body.about,
  })
  .then((user) => {
    if(user) {
      res.status(200).send({data: user});
    } else {
      res.status(404).send({"message": "User not found. Nothing updated"});
    }
  })
  .catch((err) => {
    res.status(500).send({ Haiku: "To have no errors . . . Would be life without meaning . . . No struggle, no joy" });

});
}



module.exports.updateAvatar = (req, res) => {
  const  newAvatar = req.body.avatar;
  User.findByIdAndUpdate(req.user._id, {
    avatar: newAvatar,
  })
  .then((user) => {
    if(user) {
      res.status(200).send({data: user});
    } else {
      res.status(404).send({"message": "User not found. Nothing updated"});
    }
  })
  .catch((err) => {
    res.status(500).send({ Haiku: "With searching comes loss . . . The presence of absence . . . an error found" });
  })


};

module.exports.likeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } }, // add _id to the array if it's not there yet
  { new: true },
);

module.exports.dislikeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } }, // remove _id from the array
  { new: true },
);