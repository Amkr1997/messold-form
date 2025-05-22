const mongoose = require("mongoose");

const singleUserSchema = new mongoose.Schema({
  questionsAnswers: [
    {
      title: { type: String },
      answer: { type: String },
    },
  ],
});

const QuestionAnswers = mongoose.model("QuestionAnswers", singleUserSchema);
module.exports = QuestionAnswers;
