
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

const modify = (where,data) => {
    return Host.findOneAndUpdate(where,data, { new: true});
}

const remove = (id) => {
    return Host.findByIdAndDelete(id);
}

module.exports = {
    insert,
    list,
    loginHost,
    modify,
    remove,
}