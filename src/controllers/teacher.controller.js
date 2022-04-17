const express = require("express");

const router = express.Router();

const Teacher = require("../models/teacher.model");

router.post("", async function (req, res) {
  try {
     
    const teacher = await Teacher.create(req.body);
    return res.status(201).send(teacher);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

router.get("", async function (req, res) {
  try {
    const page=req.query.page || 1;
    const size=req.query.size || 4;
    const operation=req.query.task;
    

    if(operation=="female" || operation=="Female"){
        const teacher = await Teacher.find({$or:[{gender:"female" },{gender:"Female"}]}).skip((page-1)*size).limit(size).lean().exec();
        const totalpages=Math.ceil((await Teacher.find({$or:[{gender:"female" },{gender:"Female"}]}).countDocuments())/size)
        return res.status(201).send({teacher,totalpages,operation});
    }
    else if(operation=="male" || operation=="Male"){
        const teacher = await Teacher.find({$or:[{gender:"male" },{gender:"Male"}]}).skip((page-1)*size).limit(size).lean().exec();
        const totalpages=Math.ceil((await Teacher.find({$or:[{gender:"male" },{gender:"Male"}]}).countDocuments())/size)
        return res.status(201).send({teacher,totalpages});
    }
    else if(operation=="asc"){
        const teacher = await Teacher.find().sort({age:1}).skip((page-1)*size).limit(size).lean().exec();
        const totalpages=Math.ceil((await Teacher.find().sort({age:1}).countDocuments())/size)
        return res.status(201).send({teacher,totalpages});
    }
    else if(operation=="dsc"){
        const teacher = await Teacher.find().sort({age:-1}).skip((page-1)*size).limit(size).lean().exec();
        const totalpages=Math.ceil((await Teacher.find().sort({age:-1}).countDocuments())/size)
        return res.status(201).send({teacher,totalpages});
    }
    const teacher = await Teacher.find().skip((page-1)*size).limit(size).lean().exec();
    const totalpages=Math.ceil((await Teacher.find().countDocuments())/size)
    return res.status(201).send(teacher);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

module.exports = router;
