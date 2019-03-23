const express = require("express"),
      router = express.Router();


//INDEX
router.get("/", (req, res) => {
  res.render("shops/index");
});

module.exports = router;