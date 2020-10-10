const Cards = require('../models/card.js');

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Cards.create({
    name,
    link,
    owner: req.user._id,
  })
    .then((card) => {
      res.send({ data: card })
    })

    .catch((error) => {
      if (err.name === "ValidationError") {
        res.status(400).send({ message: "User validation failed" });
      } else {
        res.status(500).send({ message: "Internal server error" });
      }
    });
};

module.exports.returnCards = (req, res) => {
  Cards.find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch((err) => {
      res.status(500).send({ message: "An error occurred" });
    });
};


module.exports.deleteCard = (req, res) => {
  const cId = req.params.cardId; //Cardid from request
  Cards.findByIdAndRemove(cId)
    .then((card) => {
      if (card) {
        res.send({ data: card });
      } else {
        res.status(404).send({ 'message': "Card not found" })
      }
    })
    .catch((err) => {
      res.status(500).send({ 'message': "An error occurred" });
    })
};

module.exports.likeCard = (req, res) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // add _id to the array if it's not there yet
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.status(200).send({ data: card });
      } else {
        res.status(404).send({ message: "Card not found" });
      }
    })
    .catch((err) => {
      res.status(500).send({ Haiku: "With searching comes loss . . . The presence of absence . . . an error found" });
    });
};

module.exports.dislikeCard = (req, res) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // remove _id from the array
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.status(200).send({ data: card });
      } else {
        res.status(404).send({ message: "Card not found" });
      }
    })
    .catch((err) => {
      res.status(500).send({ Haiku: "With searching comes loss . . . The presence of absence . . . an error found" });
    });
};