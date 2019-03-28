const express = require('express'),
	Shop = require('../models/shop'),
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

router.post("/", (req, res) => {
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
