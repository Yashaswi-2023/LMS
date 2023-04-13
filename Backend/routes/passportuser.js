const asyncHandler = require("express-async-handler");

const express = require("express");

const app = express();

const router = express.Router();

//models

const user = require("../model/user");
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
  "448994153902-tanv6n6j3v77mimma3kjdr45t6nqrvtg.apps.googleusercontent.com";

const GOOGLE_CLIENT_SECRETR = "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";

passportr.use(
  new GoogleStrategyr(
    {
      clientID: GOOGLE_CLIENT_IDR,

      clientSecret: GOOGLE_CLIENT_SECRETR,

      callbackURL: "http://localhost:3470/users/auth/google/callback",
    },

    async function (accessToken, refreshToken, profile, done) {
      userProfile = profile;

      //console.log(profile);

      if (await user.findOne({ googleId: userProfile.id })) {
      } else {
       await user.create({
          googleId: userProfile.id,
          name: userProfile.displayName,
          email: userProfile._json.email,
          password: "$2a$10$cxrNHGUB98I1Q.hLD4RGheOCbHu84N2F934dZ6D5WhtYveK6neqaK",
          uploadpicture: userProfile._json.picture,
        });
      }

      done(null, userProfile);
    }
  )
);

app.get(
  "/usr_auth",
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

    var empobj = await user.findOne({ googleId: req.user.id });

    // console.log(empobj, 708);
    if (empobj) {
      res.redirect(
        `http://localhost:5501/frontend/learners/html/lindex.html?id=${empobj._id}`
      );
    }
    else{
      res.redirect(
        `http://localhost:5501/frontend/learners/html/lindex.html`
      );
    }
  }
);

module.exports = app;
