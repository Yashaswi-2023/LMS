const mongoose = require("mongoose");
const admin1 = {
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
module.exports = mongoose.model("admin", admin1);