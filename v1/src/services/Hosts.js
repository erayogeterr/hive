
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

//  const modify = (where,data) => {
//      console.log("Modify calisti.");
//      return Host.findByIdAndUpdate(where,data, { new: true});
//  }

modify(req.user._id, req.body)
  .then((updatedHost) => {
    console.log("updated user: ", updatedHost);
    res.status(httpStatus.OK).send(updatedHost);
  })
  .catch((err) => {
    console.error("update error: ", err);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: err.message });
  });


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