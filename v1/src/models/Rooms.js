 const Mongoose = require("mongoose");
 const shortid = require('shortid');

 const RoomSchema = new Mongoose.Schema({

    //  password: {
    //      type : String,
    //      required : true,
    //  },

    code: {
      type: String,
      default: shortid.generate,
    },

    eventName: {
      type: String,
      required: true,
    },

    eventDescription: {
      type: String,
      required: true,
    },

    lessonName: {
      type: String,
      required: true,
    },

    createdBy: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },

     participants: [{
       //type: Mongoose.Schema.Types.ObjectId,
       type: String,
       ref: "Participant"
     }],
 }, { timestamps: true, versionKey: false });

 module.exports = Mongoose.model("room", RoomSchema);
