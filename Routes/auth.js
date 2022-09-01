const router = require("express").Router();
const cors = require("cors");
const User = require("../model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { registerValidation, loginValidation } = require("../validation");

router.use(cors());

//REGISTER
router.post("/register", async (req, res) => {
  //Validation user data
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  //Check if the user already exists in DB
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).json("Email already exists.");

  //Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    email: req.body.email,
    password: hashedPassword,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    genre: req.body.genre,
    age: req.body.age,
    wishlist: req.body.wishlist,
    ordersList: req.body.ordersList,
  });

  try {
    const savedUser = await user.save();
    //Create and assign a token
    const token = jwt.sign({ _id: savedUser._id }, process.env.TOKEN_SECRET);
    res.header("jwt", token).json({
      accessToken: token,
      user: savedUser,
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  //Validation user data login
  const { error } = loginValidation(req.body);
  console.log(error);
  if (error) return res.status(400).json(error.details[0].message);

  //Check if user exist in the DB
  const savedUser = await User.findOne({ email: req.body.email });
  if (!savedUser)
    return res.status(400).json("User does not exist. Please sign up.");

  //Check if password is correct
  const validPass = await bcrypt.compare(req.body.password, savedUser.password);
  if (!validPass) return res.status(400).json("Invalid password");

  //Create and assign a token
  const token = jwt.sign({ _id: savedUser._id }, process.env.TOKEN_SECRET);
  res.header("jwt", token).json({
    accessToken: token,
    user: savedUser,
  });
});

module.exports = router;
