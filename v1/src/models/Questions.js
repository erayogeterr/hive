const Mongoose = require("mongoose");

const QuestionSchema = new Mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  participant: {
    type: String,
  //  ref: "Participant",
  },
  room: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: "Room",
  },
}, { timestamps: true, versionKey: false });

module.exports = Mongoose.model("Question", QuestionSchema);