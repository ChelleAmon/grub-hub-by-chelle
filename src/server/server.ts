import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import * as socketIO from "socket.io";
import http from 'http';
import dotenv from "dotenv";
import path from 'path';
import { getRestoAdmin, loginRestoAdmin, postRestoAdmin } from "./routes/restoAdmin.routes.js";
import { postMenu } from "./routes/menu.routes.js";

dotenv.config();

const __dirname = path.resolve();
const app = express();
const server = http.createServer(app);
const clientPath = path.join(__dirname, '/dist/client');


app.use(express.static(clientPath));

const io = new socketIO.Server(server,  { cors: {
  origin: '*'
}});

const PORT = process.env.PORT || 3000;

mongoose
  // .connect(`${process.env.MONGO_URI}`)
  .connect('mongodb://localhost:27017/grub-hub-by-chelle')
  .then(() => {
    console.log("Connected to DB Successfully");
  })
  .catch((err) => console.log("Failed to Connect to DB", err));

app.use(cors({
    credentials: true,
    origin: ['http://localhost:3000', 'http://localhost:4200', 'http://localhost:3501', 'http://localhost:8080']
}));


app.use(express.json());
app.use('/api/admin', getRestoAdmin);
app.use('/api/admin', postRestoAdmin);
app.use('/api/admin', loginRestoAdmin);
// app.use('/api/admin', getMenusByAdminId);
app.use('/api/admin', postMenu);


app.all("/api/*", function (req, res) {
  res.sendStatus(404);
});


server.listen(PORT, function () {
  console.log(`starting at localhost http://localhost:${PORT}`);
});


io.on('connection', function(socket){
  console.log('a user connected');
  socket.emit('message', 'work')
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

app.all("*", function (req, res) {
  const filePath = path.join(__dirname, '/dist/client/index.html');
  console.log(filePath);
  res.sendFile(filePath);
});