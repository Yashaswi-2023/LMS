const asyncHandler = require("express-async-handler");

const express = require("express");

const app = express();

const router = express.Router();


//models

const teacher = require("../model/instructors");
const session = require("express-session");

let cors = require("cors");

app.use(cors());

app.use(
  session({
    resave: false,

    saveUninitialized: true,

    secret: "SECRET",
  })
);



const passportr = new (require("passport").Passport)();

app.use(passportr.initialize());

app.use(passportr.session());

passportr.serializeUser(function (user, cb) {
  cb(null, user);
});

passportr.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

const GoogleStrategyr = require("passport-google-oauth").OAuth2Strategy;

const GOOGLE_CLIENT_IDR =
  "176862751679-6nvua9hl9i7d33ccimupkqu5qgpmj4q6.apps.googleusercontent.com";

const GOOGLE_CLIENT_SECRETR = "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";

passportr.use(
  new GoogleStrategyr(
    {
      clientID: GOOGLE_CLIENT_IDR,

      clientSecret: GOOGLE_CLIENT_SECRETR,

      callbackURL: "http://localhost:3470/teachers/auth/google/callback",
    },

    async function (accessToken, refreshToken, profile, done) {
      teacherProfile = profile;

      //console.log(profile);

      if (await teacher.findOne({ googleId: teacherProfile.id })) {
      } else {
        await teacher.create({
          googleId: teacherProfile.id,
          name: teacherProfile.displayName,
          email: teacherProfile._json.email,
          password: "$2a$10$cxrNHGUB98I1Q.hLD4RGheOCbHu84N2F934dZ6D5WhtYveK6neqaK",
          uploadpicture: teacherProfile._json.picture,
        });
      }

      done(null, teacherProfile);
    }
  )
);

app.get(
  "/ins_auth",
  passportr.authenticate("google", { scope: ["profile", "email"] }),
  (req, res) => {
    res.send("olll");
  }
);

app.get(
  "/auth/google/callback/",

  passportr.authenticate("google", { failureRedirect: "/error" }),

  async function (req, res) {
    // console.log(req.user, 908);

    var empobj = await teacher.findOne({ googleId: req.user.id });

    // console.log(empobj, 707);
    if(empobj){
      res.redirect(
        `http://localhost:5501/frontend/instructor/html/teacher.html?id=${empobj._id}`
      );
    }
    else{
      res.redirect(
        `http://localhost:5501/frontend/instructor/html/teacher.html`
      );
    }
  }
);

module.exports = app;
