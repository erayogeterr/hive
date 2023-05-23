// const express = require("express");
// const fileUpload = require("express-fileupload");
// const helmet = require("helmet")
// const config = require("./config");
// const loaders = require("./loaders");
// const events = require("./scripts/events");
// const { UserRoutes, RoomRoutes } = require("./api-routes");
// const cors = require("cors")
// const path = require("path");
// const http = require('http');
// const socketIO = require('socket.io');
// const server = http.createServer(app);
// const io = socketIO(server);

// require('./QuestionController')(io);
// config();
// loaders();

// const app = express();
// app.use(express.json());
// app.use(helmet());
// app.use(cors());
// app.use(fileUpload());
// app.use("/uploads", express.static(path.join(__dirname, "./", "uploads")));
// app.set('trust proxy', true);





// app.listen(process.env.APP_PORT || 8000, () => {
//     console.log("Sunucu ayağa kalktı.");
//     app.use("/users", UserRoutes);
//     app.use("/rooms", RoomRoutes);
// })
const express = require("express");
const fileUpload = require("express-fileupload");
const helmet = require("helmet");
const config = require("./config");
const loaders = require("./loaders");
const events = require("./scripts/events");
const { UserRoutes, RoomRoutes, QuestionRoutes } = require("./api-routes");
const cors = require("cors");

const path = require("path");

const http = require('http');
const socketIO = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: '*:*',
    methods: ["GET", "POST"],
    credentials: true
  }
});

config();
loaders();
const { questionSocket } = require('./controllers/QuestionController');
const { JoinRoom } = require('./controllers/Rooms');
questionSocket(io);
JoinRoom(io);

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
});