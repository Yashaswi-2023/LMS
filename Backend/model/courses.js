const { doubleclicksearch_v2 } = require("googleapis");
const { Double, Int32 } = require("mongodb");

const mongoose = require("mongoose");

const course1 = {
  name: {
    unique: true,
    type: String,
  },

  description: {
    type: String,
  },

  prerequisites: {
    type: Array,
  },

  price: {
    type: Number,
  },

  uploaded: {
    type: String,
  },

  important_files: {
    type: Array,
  },
  
  modules: {
    type: Array,
  },

  videos: {
    type: Array,
  },

  times : {
    type :Array,
  },

  quiz: {
    type: Array,
  },

  students: {
    type: Array,
  },

  type: {
    type: String,
  },

  adbookmark: {
    type: Boolean,
  },

  tbookmark: {
    type: Boolean,
  },

  ratings: {
    type: Array,
  },

  averagerating: {
    type: Number,
  },

  reviews: {
    type: Array,
  },

  status: {
    type: Boolean,
  },
  test_name: { type: String, unique: true },
  test_description: { type: String },
  questions: [
    {
      questionText: { type: String },
      options: { type: [String] },
      correctAnswer: { type: String },
    },
  ],
  scores : {
    type: Array,
  }
};

module.exports = mongoose.model("course", course1);
