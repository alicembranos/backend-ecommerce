const router = require("express").Router();

router.post("/register", (req, res) => {
  res.send("Register");
});

router.post("/login", (req, res) => {
  res.send("Login");
});

module.exports = router;
