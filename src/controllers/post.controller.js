const express = require("express");

const Post = require("../models/post.model.js");

const authenticate = require("../middlewares/authenticate");

const router = express.Router();

router.post("", authenticate, async (req, res) => {
  try {
    req.body.user_id = req.user._id;
    const post = await Post.create(req.body);

    return res.send(post);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.get("", authenticate, async (req, res) => {
  try {
    const post = await Post.find().lean().exec();

    return res.send(post);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.patch("/:id", authenticate, async (req, res) => {
    try {
      const Upost = await Post.findByIdAndUpdate(req.params.id,req.body,{new:true})
  
      return res.send(Upost);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  });


  router.delete("/:id", authenticate, async (req, res) => {
    try {
      const Dpost = await Post.findByIdAndDelete(req.params.id);
  
      return res.send(Dpost);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  });

module.exports = router;