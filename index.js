
// //express--package
// const express = require('express');
// const app = express()
// //dotenv-package
// require('dotenv').config();
// //cors-package
// // var cors = require('cors')
// // app.use(cors())
// //body-parse-package
// var bodyParser = require('body-parser');
// app.use(bodyParser.json())
// //from dbconfiguration to getting Url
// const { URL } = require('./Dbconfig/Dbconfig');
// //mongoose-package
// // const mongoose = require('mongoose');
// // mongoose.connect(URL)
// //   .then(() => console.log('Connected!'));

// //Geting router
// var userRouter = require('./Routers/user');
// var chatRouter= require('./Routers/chat')

// //use Router
// app.use('/user',userRouter);
// app.use('/chat',chatRouter);

// const http = require("http");
// const cors = require("cors");
// const { Server } = require("socket.io");
// app.use(cors());

// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"],
//   },
// });
// app.get("/", function (req, res) {
//     res.send("<h1>Simple Chat App Server...</h1>");
//   });
// io.on("connection", (socket) => {
//   console.log(`User Connected: ${socket.id}`);

//   socket.on("join_room", (data) => {
//     socket.join(data);
//     console.log(`User with ID: ${socket.id} joined room: ${data}`);
//   });

//   socket.on("send_message", (data) => {
//     socket.to(data.room).emit("receive_message", data);
//   });

//   socket.on("disconnect", () => {
//     console.log("User Disconnected", socket.id);
//   });
// });

// // app.get('/', function (req, res) {
// //   res.send('Hello World')
// // })
// // app.post('/data', async (req, res) => {
// //   let a = await req.body
// //   res.send("hai")
// //   console.log(a);
// // })




// app.listen(process.env.PORT || '9000', () => (console.log("localhost:9000")))


const express = require("express");
const app = express();
// //dotenv-package
 require('dotenv').config();
 // //body-parse-package
var bodyParser = require('body-parser');
app.use(bodyParser.json())
// //from dbconfiguration to getting Url
 const { URL } = require('./Dbconfig/Dbconfig');
// //mongoose-package
 const mongoose = require('mongoose');
 mongoose.connect(URL)
   .then(() => console.log('Connected!'));
const http = require("http");
var cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());


const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://mellifluous-zabaione-cd31bd.netlify.app",
    methods: ["GET", "POST"],
  },
});
app.get("/", function (req, res) {
    res.send("<h1>Simple Chat App Server...</h1>");
  });
io.on("connection", (socket) => {
  socket.on("join_room", async(data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
    const userchat=await ChatModel.find({roomid:data});
    console.log(userchat);
    socket.to(data).emit("receive_message", userchat);
  });

  socket.on("send_message", async(data) => {
    const userchat=await ChatModel.find({roomid:data.room});
    let b=await ChatModel.findOneAndUpdate({roomid:data.room},{$push:{chat:{author:data.author,message:data.message,time:data.time}}})
    let receivedata={author:data.author,message:data.message,time:data.time};;
    socket.to(data.room).emit("receive_message", receivedata);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

// //Geting router
var userRouter = require('./Routers/user');
var chatRouter= require('./Routers/chat');
const { ChatModel } = require("./Model/chatnumber");

// //use Router
 app.use('/user',userRouter);
 app.use('/chat',chatRouter);

const PORT = process.env.PORT || 9000;

server.listen(PORT, () => {
    console.log(`App is running on PORT ${PORT}`);
})