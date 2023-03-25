
const Host = require("../models/Hosts");

const insert = (hostData) => {
    const host = new Host(hostData);
    return host.save();
}

const list = () => {
   return Host.find({});
}

const getHostById = () => {
    return Host.findById();
}

module.exports = {
    insert,
    list,
    getHostById,
}