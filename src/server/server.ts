import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import cookieParser from "cookie-parser";
import * as socketIO from "socket.io";
import http from 'http';
import dotenv from "dotenv";
import path from 'path';

import { RestoAdminModel } from "./schemas/restoAdmin.schema.js";
import { authHandler } from "./middleware/auth.middleware.js";


dotenv.config();

const __dirname = path.resolve();
const app = express();
const server = http.createServer(app);
const clientPath = path.join(__dirname, '/dist/client');
const saltRounds = 10;
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

app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: ['http://localhost:3000', 'http://localhost:4200', 'http://localhost:3501', 'http://localhost:8080']
}));
app.use(express.json());


app.get("/api/test", function (req, res) {
  res.json({message: "Hello World!"});
});


app.get("/api/admin/RestoAdmin", function (req: any, res){
  RestoAdminModel.findOne({storeNumber: req.body.storeNumber}, "-password")
  .then(data => {
    res.json(data)
  })
  .catch(err => {
    res.status(501).json({error: err})
  })
});

app.post("/api/admin/RestoAdmin",  async function (req,res){
  const { restoName, storeNumber, firstName, lastName, email, password, isAdmin, timestamp} = req.body;

  const isStoreNumberUnique = await RestoAdminModel.findOne({storeNumber}).lean();

  if (isStoreNumberUnique){
    res.status(302).send(`Found ${storeNumber} on file. Please check with your administrator for some assistance.`)
  }else if(restoName == ""|| storeNumber == "" || firstName == ""|| lastName== "" || email == ""|| password == ""){
    res.send('Fill up all required fields!');
  }else {
    bcrypt.genSalt(saltRounds, function(err, salt){
      bcrypt.hash(password, salt, function (err, hash){
        const restoAdmin = new RestoAdminModel({ 
          restoName, 
          storeNumber, 
          isAdmin, 
          timestamp: Date.now() 
        });
  
        restoAdmin.adminInfo = {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: hash,
          isAdmin: true
        }
      
        restoAdmin.save()
        .then (data => {
          res.json({data});
        })
        .catch(err => {
          if (err.name === "ValidationError"){
            let errors = {};
            Object.keys(err.errors).forEach((key) => {
              err[key] = err.errors[key].message
              errors = (err[key])
            });

          return res.status(400).send({Error: errors})
          }
          res.status(500).json({message: "Something went wrong"})

        })
      })
    })
  }
})


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