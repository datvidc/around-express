const Cards = require('../models/card.js');


module.exports.createCard = (req, res) => {
  const {name, link } = req.body;

  Cards.create({
    name,
    link,
    owner: req.user._id,
  })
    .then((card) => {
      res.send({ data: card })
    })

    .catch((error) => {
      res.status(500).send({ message: 'What did you do This time ??' })
    });

};

module.exports.returnCards = (req, res) => {
  Cards.find({})
  .then((cards) => {
    res.send(cards);
  })
  .catch(err => res.status(500).send({ message: 'What did you do This time ??' }));
}

module.exports.deleteCard = (req, res) => {
  let cId = req.params.cardId; //Cardid from request
  Cards.findByIdAndRemove(cId)
    .then((card) => {
      if(card) {
        res.send({ data: card });
      } else {
        res.status(404).send({ 'message': "Card not found"})
      }

    })
    .catch((err) => {
      res.status(500).send({ 'message': "An error occurred"});
    })

}
