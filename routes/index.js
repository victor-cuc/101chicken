const express = require('express'),
	router = express.Router(),
	passport = require('passport'),
	User = require('../models/user');

router.get('/', (req, res) => {
	res.render('landing');
});

router.get('/register', (req, res) => {
	res.render('register');
});

router.post('/register', (req, res) => {
	const newUser = new User({ username: req.body.username });
	User.register(newUser, req.body.password, (err, newUser) => {
		if (err) {
			console.log(err);
			res.redirect('back');
		} else {
			passport.authenticate('local')(req, res, () => {
				res.redirect('/shops');
			});
		}
	});
});

router.get('/login', (req, res) => {
	res.render('login');
});

router.post(
	'/login',
	passport.authenticate('local', {
			successRedirect: '/shops',
			failureRedirect: '/login'
		}),
	);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect('/shops');
})

module.exports = router;
