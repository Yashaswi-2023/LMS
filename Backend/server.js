const cors = require("cors");

const express = require("express");

const mongoose = require("mongoose");

const path = require("path");

const cookieParser = require("cookie-parser");

const storage = require("express-session");
const Razorpay = require("razorpay");
const request = require("supertest");

const app = express();

const route = express.Router();
const io = require("./socket");
const mailer = require("./nodemailer");

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
  "mongodb+srv://pkoushik347:hanBrQ6gATjxkVoR@cluster.nrkje1d.mongodb.net/learnx"
).then;

{
  console.log("The database is connected");
}
app.post("/payment", async (req, res) => {
  let { amount } = req.body;

  var instance = new Razorpay({
    key_id: "rzp_test_sx8NkpT8TxSC7k",
    key_secret: "7XA6LTbKxE8Ug0UYqPGR4Dc6",
  });

  let order = await instance.orders.create({
    amount: amount * 100,
    currency: "INR",
    receipt: "receipt#1",
  });
  res.status(201).json({
    succes: true,
    order,
    amount,
  });
});

const courses = require("./model/courses");

const learners = require("./model/user");

const instructors = require("./model/instructors");

const admin = require("./model/admin");

const message = require("./model/messages");

const conversation = require("./model/conversations");

const bcrypt = require("bcryptjs");


app.use("/", require("./routes/user"));

app.use("/", require("./routes/instructor"));

app.use("/", require("./routes/admin"));

app.use("/", require("./routes/chat"));

app.use("/users", require("./routes/passportuser"));

app.use("/teachers", require("./routes/passportteacher"));

const nodemailer = require("nodemailer");

const { google } = require("googleapis");

const OAuth2 = google.auth.OAuth2;

const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.send({
    message: "Default route in email tutorial project",
  });
});

const myOAuth2Client = new OAuth2(
  "595698475780-v40o9e17jju557sq7ftr4ajsnet4d87k.apps.googleusercontent.com",

  "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",

  "https://developers.google.com/oauthplayground"
);

myOAuth2Client.setCredentials({
  refresh_token:
  "1//04OCLrgXN2tXBCgYIARAAGAQSNwF-L9IrojZeAn7rdnC067YcLD4L2i6ptSyr7OBeeaNOjCSouEDwmNezmPVbbnkkP_DC__KHGOc"});

const myAccessToken = myOAuth2Client.getAccessToken();

const transport = nodemailer.createTransport({
  service: "gmail",

  auth: {
    type: "OAuth2",

    user: "careers.learnx@gmail.com",

    clientId:
      "595698475780-v40o9e17jju557sq7ftr4ajsnet4d87k.apps.googleusercontent.com",

    clientSecret: "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",

    refreshToken:
    "1//04OCLrgXN2tXBCgYIARAAGAQSNwF-L9IrojZeAn7rdnC067YcLD4L2i6ptSyr7OBeeaNOjCSouEDwmNezmPVbbnkkP_DC__KHGOc",
    accessToken: myAccessToken,
  },
});

app.post("/sendemailC", function (req, res) {
  const mailOptions = {
    from: "careers.learnx@gmail.com",

    to: req.body.email,

    subject: "Course Bought!",

    attachments: [
      {
        filename: "logo-color.png",

        path: `${__dirname}/logo-color.png`,

        cid: "logo",
      },
      {
        filename: "pay.png",
        path: `${__dirname}/pay.png`,
        cid: "pay",
      },
    ],

    html: `<h3>Hi, ${req.body.fullname}</h3>

  <p>Thanks for buying ${req.body.corname} course on LearnX</p>

  <p>Go to course details page of <a href="#">${req.body.corname}</a></p>

  <p>Amount Paid : <b>₹${req.body.amount}/-</b></p>

  <p>Paid Via : <b>${req.body.paid}</b></p>
    <img src = "cid:pay" width =60px height = 60px>
  <br>

  <br>

  <br>

  <br>

  <br>
  <footer>

   <p>Regards,</p>

   <p>Learn++<p>

   <img src="cid:logo" width = 60px/>

  </footer>`,
  };

  transport.sendMail(mailOptions, function (err, result) {
    if (err) {
      res.send({
        message: err,
      });
    } else {
      transport.close();

      res.send({
        message: "Email has been sent: check your inbox!",
      });
    }
  });
});

app.post("/sendemailChat", function (req, res) {
  const mailOptions = {
    from: "careers.learnx@gmail.com",

    to: req.body.email,

    subject: `Message received from ${req.body.sender} on LearnX!`,

    attachments: [
      {
        filename: "logo-color.png",

        path: `${__dirname}/logo-color.png`,

        cid: "logo",
      },
    ],

    html: `<h3>Hi, ${req.body.fullname}</h3>
  <h4>Message from ${req.body.sfn}:</h4>
  <p><i>${req.body.message}</li></p>

  <br>

  <br>

  <br>

  <br>

  <br>

  <footer>

   <p>Regards,</p>

   <p>Learn++<p>

   <img src="cid:logo" width = 60px/>

  </footer>`,
  };

  transport.sendMail(mailOptions, function (err, result) {
    if (err) {
      res.send({
        message: err,
      });
    } else {
      transport.close();

      res.send({
        message: "Email has been sent: check your inbox!",
      });
    }
  });
});

app.post("/sendemailL", function (req, res) {
  const mailOptions = {
    from: "careers.learnx@gmail.com",

    to: req.body.email,

    attachments: [
      {
        filename: "logo-color.png",

        path: `${__dirname}/logo-color.png`,

        cid: "logo",
      },
    ],

    subject: "Login Alert!",

    html: `<h3> Hi, ${req.body.fullname}</h3>

  <p>Thanks for Logging into Learn++</p>

  <p>Go to our <a href="#">Courses Page</a></p>

  <br>

  <br>

  <br>

  <br>

  <br>

  <br>

  <br>

  <footer>

   <p>Regards,</p>

   <p>Learn++<p>

   <img src="cid:logo" width = 60px/>

  </footer>`,
  };

  transport.sendMail(mailOptions, function (err, result) {
    if (err) {
      res.send({
        message: err,
      });
    } else {
      transport.close();

      res.send({
        message: "Email has been sent: check your inbox!",
      });
    }
  });
});

app.post("/sendemailR", function (req, res) {
  const mailOptions = {
    from: "careers.learnx@gmail.com",

    to: req.body.email,

    attachments: [
      {
        filename: "logo-color.png",

        path: `${__dirname}/logo-color.png`,

        cid: "logo",
      },
    ],

    subject: "Register Alert!",

    html: `<h3> Hi, ${req.body.fullname}</h3>

  <p>Thanks for Registering into Learn++</p>

  <p>Go to our <a href="#">Login Page</a></p>

  <br>

  <br>

  <br>

  <br>

  <br>

  <br>

  <br>

  <footer>

   <p>Regards,</p>

   <p>Learn++<p>

   <img src="cid:logo" width = 60px/>

  </footer>`,
  };

  transport.sendMail(mailOptions, function (err, result) {
    if (err) {
      res.send({
        message: err,
      });
    } else {
      transport.close();

      res.send({
        message: "Email has been sent: check your inbox!",
      });
    }
  });
});

app.post("/sendemailFP", function (req, res) {
  const mailOptions = {
    from: "careers.learnx@gmail.com",

    to: req.body.email,

    attachments: [
      {
        filename: "logo-color.png",

        path: `${__dirname}/logo-color.png`,

        cid: "logo",
      },
    ],

    subject: "Reset your Password!",

    html: `<h3> Hi, ${req.body.fullname}</h3>

  <p>Reset your password of Learn++ using this OTP:</p>

  <p>${req.body.otp}</p>

  <br>

  <br>

  <br>

  <br>

  <br>

  <br>

  <br>

  <footer>

   <p>Regards,</p>

   <p>Learn++<p>

   <img src="cid:logo" width = 60px/>

  </footer>`,
  };

  transport.sendMail(mailOptions, function (err, result) {
    if (err) {
      res.send({
        message: err,
      });
    } else {
      transport.close();

      res.send({
        message: "Email has been sent: check your inbox!",
      });
    }
  });
});

app.post("/sendemailCon", function (req, res) {


const mailOptions = {

from: req.body.email,



to: "careers.learnx@gmail.com",



subject: req.body.subject,



attachments: [

{

filename: "logo-color.png",



path: `${__dirname}/logo-color.png`,



cid: "logo",

},

],



html: `<h3>Hi, Admin</h3>

   

<p>${req.body.message.replace("/n","<br>")}</p>



<br>



<br>



<br>



<br>



<br>

<footer>



<p>Regards,</p>



<p>${req.body.name}<p>



<img src="cid:logo" width = 60px/>



</footer>`,

};



transport.sendMail(mailOptions, function (err, result) {

if (err) {

res.send({

message: err,

});

} else {

transport.close();



res.send({

message: "Email has been sent: check your inbox!",

});

}

});

});

const multer = require("multer");

const upload_cvideos = multer({ dest: "./uploads" });

app.use(express.urlencoded({ extended: true }));

app.post("/add-courses", upload_cvideos.array("mvid"), uploadFiles);

function uploadFiles(req, res) {

  res.json({ message: "Successfully uploaded files" });
}

app.listen(3470, (req, res) => {
  console.log("http://localhost:3470");
});
