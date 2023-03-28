const mongoose = require("mongoose");
const course1 = {
  name :{
    type: String,
  },
  description : {
    type : String,
  },
  prerequisites :{
    type : Array,
  },
  price : {
    type : Number,
  },
  uploaded : {
    type : String,
  },
  modules : {
    type:Array,
  },
  videos : {
    type : Array,
  },
  quiz: {
    type :Array,
  },
  students : {
    type:Array,
  },
  type :{
    type : String,
  }
}
module.exports = mongoose.model("course",course1);