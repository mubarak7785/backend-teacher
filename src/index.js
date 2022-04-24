const express = require ("express")
const cors = require("cors")


const app = express()
app.use(cors())
const port=process.env.PORT || 4321
app.use(express.json())
const connect = require("./configs/db")

const {register,login} = require ("./controllers/auth.controller")

app.post("/register",register)
app.post ("/login",login)


const userController = require ("./controllers/user.controller")
const teacherController=require("./controllers/teacher.controller")
const classesController=require("./controllers/class.controller")


app.use("/teachers",teacherController)
app.use("/classes",classesController)



app.listen(port,async function (req,res){
    try{
        connect();
        console.log ("Listening Port 4321 ")
    }catch(err){
        console.log(err.message)
    }
})