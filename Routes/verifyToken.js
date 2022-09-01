const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("jwt");
  if (!token) return res.status(401).send("Access Denied");

  try {
    const verified = jwt.verify(token, proccess.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
};
