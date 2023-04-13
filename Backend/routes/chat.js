const express = require("express");
const router = express.Router();
const cors = require("cors");
const usercon = require("../controllers/user");
const { validateToken } = require("../middlewares/validateToken");
const { preventToken } = require("../middlewares/preventToken");

const courses = require("../model/courses");

const messages = require("../model/messages");
const conversations = require("../model/conversations");
const learners = require("../model/user");

const instructors = require("../model/instructors");

const admin = require("../model/admin");
router.use(cors())
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
// router.use(express.json())
// router.use(cors())
// router.use(express.urlencoded({ extended: true }));

router.post("/conversations", async (req, res) => {
    var con = await conversations.findOne({
        members: { $all: req.body.members },
      });
      //logs
  if(! con){
    await conversations.create({
        members: req.body.members,
      });
  }
  res.send("done");
});
router.post("/messages", async (req, res) => {
  var con = await conversations.findOne({
    members: { $all: req.body.members },
  });
  // //logs
  await messages.create({
    conversationid: con._id,
    senderid: req.body.senderid,
    message: req.body.message,
  });
  res.send("done");
});
router.get("/conversations", async (req, res) => {
  // //logs
//   console.log(req.headers);
  var list = await conversations.find({ members: { $in: [req.headers.id] } });
  // //logs
  // console.log(list);
  usernames = [];
  for (obj of list) {
    // //logs
    if (obj.members[0] == req.headers.id) {
      if (req.headers.base == "users") {
        var user = await instructors.findOne({ _id: obj.members[1] });
        usernames.push(user);
      } else {
        var user = await learners.findOne({ _id: obj.members[1] });
        usernames.push(user);
      }
    } else if (obj.members[1] == req.headers.id) {
      if (req.headers.base == "users") {
        var user = await instructors.findOne({ _id: obj.members[0] });
        usernames.push(user);
      } else {
        var user = await learners.findOne({ _id: obj.members[0] });
        usernames.push(user);
      }
    }
  }
  // //logs
  res.send(usernames);
});
router.get("/messages", async (req, res) => {
  // //logs
  conid = await conversations.findOne({
    members: { $all: req.headers.members.split(",") },
  });
  //logs
  var data = await messages.find({ conversationid: conid._id });
  res.send(data);
});
module.exports = router;
