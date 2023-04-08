const User = require("../models/Users");

const insert = (data) => {
    const user = new User(data);
    return user.save();
}

const list = () => {
   return User.find({});
}

const loginUser = (loginData) => {
    return User.findOne(loginData)
}

const modify = (userId, usersData) => {
    return User.findByIdAndUpdate(userId, usersData);
  };

  const modifyV2 = (userId, usersData) => {
    const options = { new: true }; // sadece güncellenen alanları döndürmek için options nesnesi
    return User.findByIdAndUpdate(userId, usersData, options)
      .select('firstName lastName email'); // sadece firstName, lastName ve email alanlarını döndür
  };

const remove = (id) => {
    return User.findByIdAndDelete(id);
}

module.exports = {
    insert,
    list,
    loginUser,
    modify,
    remove,
    modifyV2,
}