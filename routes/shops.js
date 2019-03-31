const express = require('express'),
	Shop = require('../models/shop'),
	Review = require('../models/review'),
	router = express.Router();

//INDEX
router.get('/', (req, res) => {
	Shop.find({}, (err, foundShops) => {
		if (err) {
			console.log(err);
		} else {
			res.render('shops/index', { shops: foundShops });
		}
	});
});

//NEW FORM
router.get("/new", (req, res) => {
  res.render("shops/new");
});

//CREATE
router.post("/", (req, res) => {
	req.body.shop.description = req.sanitize(req.body.shop.description);
	Shop.create(req.body.shop, (err, createdShop) => {
		if (err) {
			console.log(err);
			res.redirect("back");
		} else {
			console.log("User added new shop: " + createdShop.name);
			res.redirect("/shops");
		}
	});
});

//DELETE
router.delete("/:id", (req, res) => {
	Shop.findByIdAndDelete(req.params.id, (err, deletedShop) => {
		if (err) {
			console.log(err);
			res.redirect("back");
		} else {
			console.log("Deleted: " + deletedShop.name);
			Review.deleteMany({ _id: { $in: deletedShop.reviews } }, (err) => {
				if (err) {
					console.log(err);
				} else {
					console.log("Deleted all comments on shop as well");
				}
			});
			res.redirect('/shops');
		}
	});
});

//SHOW
router.get('/:id', (req, res) => {
	Shop.findById(req.params.id).populate("reviews").exec((err, foundShop) => {
		if (err) {
      console.log(err);
			res.redirect('/shops');
		} else {
      res.render('shops/show', { shop: foundShop });
		}
	})
});

module.exports = router;
