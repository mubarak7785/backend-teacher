
require("dotenv").config();
const express=require('express');
const mongoose=require("mongoose");
const app=express();
      app.use(express.json())
const connect=()=>{
    mongoose.connect("mongodb+srv://asif:asif_456@cluster0.ep2by.mongodb.net/outh?retryWrites=true&w=majority");
}

const {register,login}=require('./controllers/auth.controller');
const postController = require("./controllers/post.controller");

  
app.post("/register",register)
app.post("/login",login);
app.use("/post", postController);

app.listen(process.env.PORT || 5500, async function () {
    try {
      await connect();
      console.log("app is listening on port 5500");
    } catch (err) {
      console.log(err.message);
    }
  });
