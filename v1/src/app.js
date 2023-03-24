const express = require("express");
const helmet = require("helmet")
const config = require("./config");
const loaders = require("./loaders");

config();
loaders();

const app = express();
app.use(express.json());
app.use(helmet());




console.log("Merhaba Özhan");
console.log("Merhaba Özhan");


app.listen(process.env.APP_PORT, () => {
    console.log("Sunucu ayağa kalktı.")
})