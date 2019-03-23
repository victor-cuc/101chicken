const express     = require("express"),
      bodyParser  = require("body-parser"),
      mongoose    = require("mongoose"),
      app         = express(),
      methodOverride = require("method-override");


const indexRoutes = require("./models/index"),
      commentRoutes = require("./models/comment"),
      shopRoutes = require("./models/shop");

mongoose.connect("mongoose://localhost:27017/101chicken", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));

app.use(indexRoutes);
// app.use("/shops/:id/comments", commentRoutes);
// app.use("/shops", shopRoutes);

app.listen(3000, () => {
  console.log("SERVER STARTED");
});
