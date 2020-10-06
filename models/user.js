const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  name: { //  name — username, string from 2 to 30 characters, required field
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: { // about — user information, string from 2 to 30 characters, required field
    type: String,
    required: true, // every user has a name, so it's a required field
    minlength: 2, // the minimum length of the name is 2 characters
    maxlength: 30, // the maximum length is 30 characters
  },
  avatar: {
    type: String,
    required: true;
    validate: {
      validator(v) {
        const rex = '^https?:\/\/(www\.)?[a-zA-Z0-9-._~:?[\]@!$?&'\/()#*+,;=%]+\.[a-zA-Z0-9-._~:?#[\]@!$&'()*+,;=\/%]+($#?)?';
        return rex.test(v);
      },
      message: 'Sorry, the URL does not match my validation requirements'
    }
  }
});


module.exports = mongoose.model('user', userSchema);