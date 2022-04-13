require("dotenv").config();
const mongoose=require("mongoose");
const User=require("../models/user.model.js")
var jwt = require('jsonwebtoken');

const newToken = (user) => {
  return jwt.sign({ user }, process.env.JWT_SECRET_KEY);
};



const register=async(req,res)=>{
  try {
    
    let user=await User.findOne({email:req.body.email}).lean().exec();
    if(user)
    return res.send("this email is already exist");

      user=await User.create(req.body);
    const token=newToken(user);
    res.send({ user, token });

  } catch (err) {
    res.status(500).send(err.message);
  }
}



const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(400).send({ message: "Please try another email or password" });
      // console.log(user.checkPassword())
    const match =user.checkPassword(req.body.password);
       

    if (!match)
      return res.status(400).send({ message: "Please try another email or password" });
    const token = newToken(user);
    res.send({ user, token });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports={register,login};