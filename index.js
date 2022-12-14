const express = require("express");
const cors = require("cors");
const app = express();
const data = require("./src/data/data.json");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
//Import authentication routes
const authRoutes = require("./Routes/auth");
const postRoutes = require("./Routes/posts");

dotenv.config();

//Connect to db
mongoose.connect(process.env.DB_CONNECT, () =>
  console.log("Connected to DB.")
);

//Middleware
app.use(cors());
app.use(express.json());

//main path
app.get("/", (req, res) => {
  res.send("<h1>E-COMMERCE API</h1>");
});

//request to get albums
app.get("/albums", (req, res) => {
  res.json(data.albums);
});

//request to get album by id
app.get("/albums/:id", (req, res) => {
  const id = req.params.id;

  const albums = data.albums;
  const items = albums.items;

  const album = items.find((item) => (item.data.id = id));
  res.json(album);
});

//request to get images
app.get("/images", (req, res) => {
  res.json(data.images);
});

//request to get concerts
app.get("/concerts", (req, res) => {
  res.json(data.concerts);
});

//User routes middleware
app.use("/user", authRoutes);
app.use("/post", postRoutes);

app.use((req, res) => {
  console.log(req.path);
  res.status(404).json({
    error: "Not found",
  });
});

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Sever running at http://localhost:${PORT}/`);
});
