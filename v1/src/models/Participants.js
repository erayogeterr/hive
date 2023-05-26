   const Mongoose = require("mongoose");
const { Socket } = require("socket.io");

   const ParticipantSchema = new Mongoose.Schema({
       name: {
           type: String,
           //default: () => "anonymous-" + Math.random().toString(36).substring(7),
           //default: () => "anonymous-" + ,
         },
         room: {
           type: Mongoose.Schema.Types.ObjectId,
           ref: "Rooms"
         },
         ip: {
          type: String,
        },
       }, { timestamps: true, versionKey: false });

   module.exports = Mongoose.model("participant", ParticipantSchema);

