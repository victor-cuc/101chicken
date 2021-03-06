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

mongoose.connect('mongodb://heroku_5dbjr6bk:62gmj6o1g2ldlr3l96pdffd0a7@ds229826.mlab.com:29826/heroku_5dbjr6bk', { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

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

var port = process.env.PORT || 3000;
app.listen(port, function () {
		console.log("The YelpCamp Server Has Started!");
});
