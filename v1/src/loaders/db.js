const Mongoose = require("mongoose");

const db = Mongoose.connection;

db.once("open", () => {
  console.log("DB bağlandı");
});

const connectDB = async () => {
  await Mongoose.connect(
       process.env.DATABASE_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
};

module.exports = {
  connectDB,
};