const Cards = require('../models/card.js');


module.exports.createCard = (req, res) => {
  console.log(req.user._id); // _id will become accessible
};