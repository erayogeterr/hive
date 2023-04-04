const Mongoose = require ("mongoose");
const db = Mongoose.connection;

db.once("open", () => {
    console.log("DB Bağlantısı başarılıdır.")
})

const connectDB = async () => {
   //await Mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
     
   //await Mongoose.connect(`mongodb+srv://erayogeterr:<0123107038>@hive.stkuqcg.mongodb.net/?retryWrites=true&w=majority`,
   const  mongoAtlasUri =
   "mongodb+srv://erayogeterr:<0123107038>@hive.stkuqcg.mongodb.net/?retryWrites=true&w=majority";
  
   try {
    // Connect to the MongoDB cluster
     mongoose.connect(
      mongoAtlasUri,
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => console.log(" Mongoose is connected")
    );

  } catch (e) {
    console.log("could not connect");
  }
  
  // {
    //    useNewUrlParser:true,
      //  useUnifiedTopology: true,
    //};
};

module.exports = {
    connectDB,
}