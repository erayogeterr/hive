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
const { UserRoutes, RoomRoutes } = require("./api-routes");
const cors = require("cors");

const path = require("path");

const http = require('http');
const socketIO = require('socket.io');
const app = express();
const server = http.createServer(app);
//const io = socketIO(server);
const io = require('socket.io')(server, {
    cors: {
      origin: '*',
    }
  });

config();
loaders();
const { questionSocket } = require('./controllers/QuestionController');
questionSocket(io);


// io.on('connection', (socket) => {
//     socket.emit('ahmet', {message: 'a new client connected'})
//     socket.on('ahmet', msg => {
//         console.log(msg)
//     }) 
// })

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(fileUpload());
app.use("/uploads", express.static(path.join(__dirname, "./", "uploads")));
app.set('trust proxy', true);

server.listen(process.env.APP_PORT || 8000, () => {
    console.log("Sunucu ayağa kalktı.");
    app.use("/users", UserRoutes);
    app.use("/rooms", RoomRoutes);
});