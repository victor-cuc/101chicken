const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  text: String,
  rating: Number,
  // TODO: to be changed and made a User object
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  },
});

module.exports = mongoose.model("Review", reviewSchema);