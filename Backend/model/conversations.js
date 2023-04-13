const mongoose = require("mongoose");
const c1 = {
  members: [String],
};
module.exports = mongoose.model("conversations", c1);
