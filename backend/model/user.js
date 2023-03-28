const mongoose = require("mongoose");
const user1 = {
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  bought : {
    unique : true,
    type : Array,
  },
  progress : {
    type : Array,
  }
};
module.exports = mongoose.model('user', user1);