const mongoose = require("mongoose");
const m1 = {
    conversationid : String,
    senderid: String,
    message:String
};
module.exports = mongoose.model("messages", m1);
