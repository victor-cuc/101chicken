const express = require("express"),
      Shop = require("../models/shop"),
      Review = require("../models/review"),
      router = express.Router({mergeParams: true});

router.post("/", isLoggedIn, (req, res) => {
  Shop.findById(req.params.id, (err, foundShop) => {
    if (err) {
      console.log(err);
      res.redirect("/shops");
    } else {
      const review = {
        text: req.body.text,
        rating: req.body.rating,
        author: {
          id: req.user.id,
          username: req.user.username
        }
      };
      Review.create(review, (err, createdReview) => {
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

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/login');
}

module.exports = router;