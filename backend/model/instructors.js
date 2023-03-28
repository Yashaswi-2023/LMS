const mongoose = require("mongoose");
const teacher1 = {
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
};
module.exports = mongoose.model("instructor", teacher1);