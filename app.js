const express = require('express'),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	app = express(),
	methodOverride = require('method-override'),
	expressSanitizer = require("express-sanitizer"),
	seedDB = require('./seeds'),
	passport = require("passport"),
	LocalStrategy = require("passport-local"),
	User = require("./models/user");

const indexRoutes = require('./routes/index'),
	reviewRoutes = require('./routes/reviews'),
	shopRoutes = require('./routes/shops');

mongoose.connect('mongodb://localhost:27017/101chicken', { useNewUrlParser: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
app.use(expressSanitizer());

app.use(
	require("express-session")({
		secret: "Secret String",
		resave: false,
		saveUninitialized: false
	})
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
	res.locals.currentUser = req.user;
	next();
});

//seedDB();

app.use(indexRoutes);
app.use('/shops', shopRoutes);
app.use("/shops/:id/reviews", reviewRoutes);

app.listen(3000, () => {
	console.log('SERVER STARTED');
});
