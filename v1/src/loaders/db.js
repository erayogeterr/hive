const Mongoose = require ("mongoose");
const db = Mongoose.connection;
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://erayogeterr:hiveproject676767@hive.stkuqcg.mongodb.net/?retryWrites=true&w=majority";


db.once("open", () => {
    console.log("DB Bağlantısı başarılıdır.")
})

//LocalHost
const connectDB = async () => {
    // await Mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    //  });
}; 

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
const collection = client.db("hive")
client.close();
});


module.exports = {
    connectDB,
}