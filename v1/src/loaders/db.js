const Mongoose = require ("mongoose");
const db = Mongoose.connection;
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://erayogeterr:hiveproject676767@hive.stkuqcg.mongodb.net/?retryWrites=true&w=majority";
db.once("open", () => {
    console.log("DB Bağlantısı başarılıdır.")
})

const connectDB = async () => {
   //await Mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
     
   //await Mongoose.connect(`mongodb+srv://erayogeterr:<0123107038>@hive.stkuqcg.mongodb.net/?retryWrites=true&w=majority`,
    //MongoClient.connect(`mongodb+srv://erayogeterr:hiveproject676767@hive.stkuqcg.mongodb.net/?retryWrites=true&w=majority`,{
      //  useUnifiedTopology: true })
        //.then(client => {
          //  console.log(`connected to Database`)
           // const db = client.db(`hive`)
       // });
   // };
   const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
   
}
  // {
    //    useNewUrlParser:true,
      //  useUnifiedTopology: true,
    //};
module.exports = {
    connectDB,
}