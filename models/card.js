const mongoose = require('mongoose');


const cardSchema = new mongoose.Schema({
  name: { //  name — card name, string from 2 to 30 characters, required field
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: { //link — link to the picture, string, required field. Use the regular expression from the user schema to validate input data
    type: String,
    required: true;
    validate: {
      validator(v) {
        const rex = '^https?:\/\/(www\.)?[a-zA-Z0-9-._~:?[\]@!$?&'\/()#*+,;=%]+\.[a-zA-Z0-9-._~:?#[\]@!$&'()*+,;=\/%]+($#?)?';
        return rex.test(v);
      },
      message: 'Sorry, the URL does not match my validation requirements'
    }
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'author',
    required: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'likes',
    required: true,
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);