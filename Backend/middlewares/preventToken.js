const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const asyncHandler = require("express-async-handler");
const preventToken = asyncHandler(async (req, res, next) => {
  // console.log("test prevent");
  const token = req.headers.token;
  if (token === null) {
    next();
  } else {
    jwt.verify(token, process.env.TOKEN, (err, decoded) => {
      if (err) {
        res.status(404);
      } else {
        res.status(405);
        throw new Error("crct");
      }
    });
  }
});
module.exports = { preventToken };
