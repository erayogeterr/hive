const Mongoose = require("mongoose");


const ParticipantSchema = new Mongoose.Schema({
  name: {
    type: String,
  },
  room: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: "Rooms"
  },
}, { timestamps: true, versionKey: false });

module.exports = Mongoose.model("participant", ParticipantSchema);

