
const Host = require("../models/Hosts");

const insert = (data) => {
    const host = new Host(data);
    return host.save();
}

const list = () => {
   return Host.find({});
}

const loginHost = (loginData) => {
    return Host.findOne(loginData)
}

module.exports = {
    insert,
    list,
    loginHost,
}