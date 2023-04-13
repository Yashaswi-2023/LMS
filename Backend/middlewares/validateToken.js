const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const asyncHandler=require("express-async-handler")
const validateToken=asyncHandler(async(req,res,next)=>{
  const token=req.headers.token
  if(token==null){
      res.status(404)
      res.send()
  }
  else {
  jwt.verify(token,process.env.TOKEN,(err,decoded)=>{
      if(err){
          res.status(401)
          res.send()
      }
      else{
      req.user=decoded.user
      next();
      }
  })
}
})

module.exports = { validateToken }