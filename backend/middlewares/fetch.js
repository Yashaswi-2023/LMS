const courses = require("../model/courses");

const learners = require("../model/user");

const instructors = require("../model/instructors");

const admin = require("../model/admin");

// const admin_route = require("../routes/admin");

// const instructor_route = require("../routes/instructor");

var resultl;
async function fetchl(req,res,next){
  // console.log("helloooo");
  req.resultl = await learners.find({ });
  next();
}
var resulti;
async function fetchi(req,res,next){
  req.resulti = await instructors.find({ });
  next();
}
var resdet;
async function fetchfac(req,res,next){
  resdet =await courses.find({ })
  req.resdet = resdet
  next();
}

module.exports = { fetchl, fetchi, fetchfac }