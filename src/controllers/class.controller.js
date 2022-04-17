const express = require("express");

const router = express.Router();

const Class = require("../models/class.model");

router.post("", async function (req, res) {
  try {
    const classes = await Class.create(req.body);
    return res.status(201).send(classes);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

router.get("", async function (req, res) {
  try {
    const classes= await Class.find().populate("teacher_id").lean().exec();
    return res.status(201).send(classes);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

module.exports = router;
