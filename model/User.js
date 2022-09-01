const mongoose = require("mongoose");

const userWishlit = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
});

const orderItem = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  qty: {
    type: Number,
    required: true,
  },
});

const userOrdersList = new mongoose.Schema({
  orderNumber: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  cartItems: [orderItem],
});

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    max: 255,
  },
  password: {
    type: String,
    required: true,
    max: 1024,
    min: 6,
  },
  firstname: {
    type: String,
    required: true,
    min: 4,
    max: 255,
  },
  lastname: {
    type: String,
    required: true,
    min: 4,
    max: 255,
  },
  genre: {
    type: String,
    required:false,
    default: "Man",
  },
  age: {
    type: Number,
    required: false,
    default: 18,
  },
  wishlist: {
    type: [userWishlit],
  },
  ordersList: {
    type: [userOrdersList],
  },
});

module.exports = mongoose.model("User", userSchema);
