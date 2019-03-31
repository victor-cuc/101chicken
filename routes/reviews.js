const express = require("express"),
      Shop = require("../models/shop"),
      Review = require("../models/review"),
      router = express.Router({mergeParams: true});

router.post("/", (req, res) => {
  console.log(req.params.id);
  Shop.findById(req.params.id, (err, foundShop) => {
    if (err) {
      console.log(err);
      res.redirect("/shops");
    } else {
      Review.create(req.body.comment, (err, createdReview) => {
        if (err) {
          console.log(err);
          res.redirect("back")
        } else {
          foundShop.reviews.push(createdReview);
          foundShop.save();
          res.redirect("/shops/" + foundShop._id);
        };
      });
    }
  })
});

module.exports = router;