const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { jwtkey } = require('../keys');
const router = express.Router();
const User = mongoose.model('User');
const requireToken = require('../middleware/requireToken');


router.post('/signup', async (req, res) => {
  const {username, password, name, email, phone, bio, gender, birthday} = req.body;
  try {
      const user = new User({username, password, name, email, phone, bio, gender, birthday});
      await user.save();
      const token = jwt.sign({userId: user._id}, jwtkey )
      res.send({token, username, name, email, phone, bio, gender, birthday});
  } catch(err) {
      return res.status(422).send(err.message);
  }
});

router.post('/updateprofile', requireToken, async (req, res) => {
  const { profilepic, name, email, phone, bio, gender, birthday } = req.body
  // if(!name || !email || !phone || !bio || !gender || !birthday) {
  //   return res.status(422).send({error: "can't change username"})
  // }
  try {
    await User.updateOne(
      {username: req.user.username},
      {
        $set: {
          "profilepic": profilepic,
          "name": name,
          "email": email,
          "phone": phone,
          "bio": bio,
          "gender": gender,
          "birthday": birthday
        }
      }
    )
    res.send({profilepic, name, email, phone, bio, gender, birthday})
  } catch (error) {
    console.log(error)
  }
})

router.post('/setAccType', requireToken, async (req, res) => {
  const { private } = req.body;
  try {
    await User.updateOne(
      {username: req.user.username},
      {
        $set: {
          "private": private
        }
      }
    )
    res.send({private})
  } catch (error) {
    console.log(error)
  }
})

router.post('/signin', async (req, res) => {
  const { username, password } = req.body
  if ( !username || !password) {
    return res.status(422).send({error: "username and password required"})
  }
  const user = await User.findOne({username})
  if (!user) {
    return res.status(422).send({error: "username and password required"})
  }
  try{
    await user.comparePassword(password);
    const token = jwt.sign({userId: user._id}, jwtkey )
    res.send({token, username});
  }
  catch (err) {
    return res.status(422).send({error: "username and password required"})
  }
});

router.get('/searchresult/:word', async(req, res) => {
  const word = req.params.word
  const search = await User.find({username: new RegExp(word, "i")})
  try {
    res.send({
      search
    })
  } catch (error) {
    console.log(error)
  }
})

router.get('/othersprofile/:username', async(req, res) => {
  // const {username} = req.body
  const result = await User.findOne({username: req.params.username})
  res.send({
    username: result.username,
    profilepic: result.profilepic,
    name: result.name,
    bio: result.bio
  })
})

router.get('/allusers', async(req, res) => {
  const allUsers = await User.find({})
  res.send({
    allUsers
  })
})
// router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
//     res.json({
//         user: {
//             email: req.user.email,
//             token: req.user.jwtkey
//         }
//     })
// })

module.exports = router