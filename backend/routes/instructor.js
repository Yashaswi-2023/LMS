const express = require("express");
const router = express();

const { validateToken } = require("../middlewares/validateToken");
const instcon = require("../controllers/instructor");

const courses = require("../model/courses");

const learners = require("../model/user");

const instructors = require("../model/instructors");

const admin = require("../model/admin");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const { fetchl, fetchi, fetchfac } = require("../middlewares/fetch");

router.get("/faculty-det", fetchfac, (req, res) => {
  res.send(req.resdet);
});
router.get("/tindex", validateToken, instcon.tuserdetails);
router.get("/tcourses", validateToken, instcon.tuserdetails);
router.get("/treview", validateToken, instcon.tuserdetails);
router.get("/tbookmark", validateToken, instcon.tuserdetails);
router.get("/tcourses", validateToken, instcon.tuserdetails);
router.get("/teacher-profile", validateToken, instcon.tuserdetails);
router.get("/add-listing", validateToken, instcon.tuserdetails);

router.post("/add-listing", instcon.taddlist);

router.post("/tlogin", instcon.tloginfun);

router.post("/tregister", instcon.tregisterfun);

module.exports = router;
