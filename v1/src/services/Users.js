const User = require("../models/Users");

const insert = (data) => {
    const user = new User(data);
    return user.save();
}

const list = () => {
   return User.find({});
}

const loginHost = (loginData) => {
    return User.findOne(loginData)
}

const modify = (userId, usersData) => {
    return User.findByIdAndUpdate(userId, usersData);
  };

const remove = (id) => {
    return User.findByIdAndDelete(id);
}

module.exports = {
    insert,
    list,
    loginHost,
    modify,
    remove,
}