const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
  },
  id: {
    type: String,
  },
  profilePicDark: {
    type: String,
  },
  profilePicLight: {
    type: String,
  },
  location: {
    type: String,
  },
  favBirdQuote: {
    type: String,
  },
  parrotsOwned: [
    {
      name: {
        type: String
      },
      favoriteToys: {
        type: Array
      }
    }
  ]
});

module.exports = mongoose.model('user', userSchema);
