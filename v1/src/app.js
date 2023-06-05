const express = require("express");
const fileUpload = require("express-fileupload");
const helmet = require("helmet");
const config = require("./config");
const loaders = require("./loaders");
const events = require("./scripts/events");
const { UserRoutes, RoomRoutes, QuestionRoutes, PartipicantRoutes } = require("./api-routes");
const cors = require("cors");
const path = require("path");
const http = require('http');
const socketIO = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: '*',
    methods: ["GET", "POST"],
    credentials: true
  }
});

config();
loaders();
const { questionSocket } = require('./controllers/Questions');
const { partipicantSocket } = require('./controllers/Participants');
questionSocket(io);
partipicantSocket(io);

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(fileUpload());
app.use("/uploads", express.static(path.join(__dirname, "./", "uploads")));

server.listen(process.env.APP_PORT || 8000, () => {
    console.log("Sunucu ayağa kalktı.");
    app.use("/users", UserRoutes);
    app.use("/rooms", RoomRoutes);
    app.use("/questions", QuestionRoutes);
    app.use("/partipicants", PartipicantRoutes);
});