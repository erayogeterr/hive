const express = require("express");
const fileUpload = require("express-fileupload");
const helmet = require("helmet")
const config = require("./config");
const loaders = require("./loaders");
const events = require("./scripts/events");
const { UserRoutes, RoomRoutes } = require("./api-routes");
const cors = require("cors")
const path = require("path");

config();
loaders();

const app = express();
app.use("/uploads", express.static(path.join(__dirname, "./", "uploads")));
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(fileUpload());



app.listen(process.env.APP_PORT || 8000, () => {
    console.log("Sunucu ayağa kalktı.");
    app.use("/users", UserRoutes);
    app.use("/rooms", RoomRoutes);
})
