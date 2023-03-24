const Mongoose = require("mongoose")

const HostSchema = new Mongoose.Schema({
    firstName : String,
    lastName : String,
    email : String,
    password : String,
}, {timestamps: true, versionKey : false});

module.exports = Mongoose.model("host", HostSchema);

