const Mongoose = require("mongoose");
const RoomSchema = new Mongoose.Schema({

    password: {
        type : String,
        require : true,
    },

    participants: [{
      type: Mongoose.Schema.Types.ObjectId,
      ref: "Participant"
    }],
}, { timestamps: true, versionKey: false });

module.exports = Mongoose.model("room", RoomSchema);