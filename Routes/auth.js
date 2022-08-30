const router = require("express").Router();
const User = require("../model/User");
const { registerValidation, loginValidation } = require("../validation");

router.post("/register", async (req, res) => {
  //Validation
  const { error } = registerValidation(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const user = new User({
    email: req.body.email,
    password: req.body.password,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    genre: req.body.genre,
    age: req.body.age,
    wishlist: req.body.wishlist,
    ordersList: req.body.ordersList,
  });

  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/login", (req, res) => {
  res.send("Login");
});

module.exports = router;
