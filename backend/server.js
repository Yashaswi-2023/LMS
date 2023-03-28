const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");
const storage = require("express-session");
const app = express();
const route = express.Router()
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/../frontend/learners")));
const main_p = path.join(__dirname, "/../");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
mongoose.connect(
  "mongodb+srv://batch6:herovired@cluster0.aqifkg2.mongodb.net/lms"
).then;
{
  console.log("The database is connected");
}

// const { fetchl, fetchi, fetchfac, resulti, resultl, resdet } = require("./middlewares/fetch");

const courses = require("./model/courses");

const learners = require("./model/user");

const instructors = require("./model/instructors");

const admin = require("./model/admin");


app.use("/",require("./routes/user"))
app.use("/",require("./routes/instructor"))
app.use("/",require("./routes/admin"))
app.listen(3470, (req, res) => {
  console.log("http://localhost:3470");
});


// app.use("/",require("../backend/routes/instructor"))
// app.use("/",require("..backend/routes/admin"))