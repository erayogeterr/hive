 const Mongoose = require("mongoose");

 const RoomSchema = new Mongoose.Schema({

     password: {
         type : String,
         required : true,
     },

     participants: [{
       //type: Mongoose.Schema.Types.ObjectId,
       type: String,
       ref: "Participant"
     }],
 }, { timestamps: true, versionKey: false });

 module.exports = Mongoose.model("room", RoomSchema);
