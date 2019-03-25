const mongoose = require("mongoose");

const shopSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  address: String,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review"
    }
  ]
});

module.exports = mongoose.model("Shop", shopSchema);