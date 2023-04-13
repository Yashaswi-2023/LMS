const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const asyncHandler=require("express-async-handler")
const preventToken=asyncHandler(async(req,res,next)=>{
  const token=req.headers.token
  if (token == null) {
    next();
  } else {
    jwt.verify(token, process.env.TOKEN1, (err, decoded) => {
      if (err) {
        next();
      } else {
        res.status(405);
        throw new Error("crct");
      }
    });
  }
})
module.exports = { preventToken }