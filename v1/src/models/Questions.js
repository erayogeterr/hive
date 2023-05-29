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
  likeCount: {
    type: Number,
    default: 0,
  },
  likedBy: {
    type: [String],
    default: [],
  },
}, { timestamps: true, versionKey: false });

module.exports = Mongoose.model("Question", QuestionSchema);