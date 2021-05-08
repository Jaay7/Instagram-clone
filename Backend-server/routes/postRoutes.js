const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const requireToken = require('../middleware/requireToken');
const Posts = mongoose.model('Posts');
const User = mongoose.model('User');

router.post('/uploads/posts/:username', async(req, res) => {
  const username = req.params.username
  const { postImage, postCaption, postLocation } = req.body;
  try {
    const posts = new Posts({ username, postImage, postCaption, postLocation });
    await posts.save();
    res.send({ username, postImage, postCaption, postLocation })
  } catch (error) {
    return res.status(422).send(error.message);
  }
})

router.get('/uploads/posts', async(req, res) => {
  const allPosts = await Posts.find({})
  res.send({
    allPosts
  })
})

router.get('/uploads/posts/:username', async(req, res) => {
  const allPostsOfUser = await Posts.find({username: req.params.username})
  const userdetails = await User.find({username: req.params.username})
  try {
    res.send({
      allPostsOfUser
    })
  } catch (error) {
    console.log(error)
  }
})

router.get('/uploads/nofposts/:username', async(req, res) => {
  const allPostsOfUser = await Posts.find({username: req.params.username})
  const len = allPostsOfUser.length
  try {
    await User.updateOne(
      {username: req.params.username},
      {
        $set: {
          "posts": len
        }
      }
      
    )
    res.send({
      len
    })
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
