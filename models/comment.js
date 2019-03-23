const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  text: String,
  // TODO: to be changed and made a User object
  author: String,
});

module.exports = mongoose.model("Comment", commentSchema);