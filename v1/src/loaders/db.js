const Mongoose = require ("mongoose");
const db = Mongoose.connection;
const  MongoClient = require('mongodb').MongoClient;

db.once("open", () => {
    console.log("DB Bağlantısı başarılıdır.")
})

const connectDB = async () => {
   //await Mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
     
   //await Mongoose.connect(`mongodb+srv://erayogeterr:<0123107038>@hive.stkuqcg.mongodb.net/?retryWrites=true&w=majority`,
    MongoClient.connect(`mongodb+srv://erayogeterr:hiveproject676767@hive.stkuqcg.mongodb.net/?retryWrites=true&w=majority`,{
        useUnifiedTopology: true })
        .then(client => {
            console.log(`connected to Database`)
            const db = client.db(`hive`)
        });
    };
  // {
    //    useNewUrlParser:true,
      //  useUnifiedTopology: true,
    //};
module.exports = {
    connectDB,
}