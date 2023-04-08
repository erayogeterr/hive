const Mongoose = require("mongoose")
const logger = require("../scripts/logger/Users");

const UserSchema = new Mongoose.Schema({
    //_id : Mongoose.Types.ObjectId,
    firstName : String,
    lastName : String,
    email : String,
    password : String,
    profile_image : String,
    
}, {timestamps: true, versionKey : false});

 UserSchema.post("save", (doc) => {
     logger.log({
        level : "info",
        message : doc,
     })
  })

module.exports = Mongoose.model("user", UserSchema);
