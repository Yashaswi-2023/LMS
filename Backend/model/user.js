const mongoose = require("mongoose");
const user1 = {
  googleId: {
    type: String,
  },
  name: {
    type: String,

    minlength: 1,

    maxlength: 60,

    required: true,
  },

  email: {
    type: String,

    unique: [true, "email already exists in database!"],

    required: true,

    minlength: 8,

    maxlength: 50,

    validate : {
      validator: function(v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: '{VALUE} is not a valid email!'
    }
  },

  password: {
    type: String,

    required: true,
  },

  uploadpicture: {
    type: String,
  },

  occupation: {
    type: String,
  },

  companyName: {
    type: String,
  },

  PhoneNo: {
    type: String,
    validate: {
      validator: function(v) {
        return /^[0-9]{10}/.test(v);
      },
      message: '{VALUE} is not a valid 10 digit number!'
    }
  },

  address: {
    type: String,
  },

  city: {
    type: String,
  },

  state: {
    type: String,
  },

  postcode: {
    type: String,
    length: 6,
  },

  linkedin: {
    type: String,
  },

  facebook: {
    type: String,
  },

  twitter: {
    type: String,
  },

  instagram: {
    type: String,
  },

  bought: {
    type: Array,
  },

  progress: {
    type: Array,
  },

  todo : {
    type : Array,
  },

  notes : {
    type : Array,
  },

  score : {
    type : Array,
  }
};

module.exports = mongoose.model("user", user1);
