const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const User = mongoose.model('User');
// const FandF = mongoose.model('FandF')

router.post('/sendfollow/:currentuser/:otheruser', async(req, res) => {
  const otheruser = await User.findOne({username: req.params.otheruser})
  const currentuser = await User.findOne({username: req.params.currentuser})
  // var {name} = req.body
  var follower = { personName: req.params.currentuser }
  var followin = { personName: req.params.otheruser }
  try {
    if ( otheruser.private === true ) {
      if (otheruser.followers.map((index) => index.personName).includes(currentuser.username) || 
          currentuser.following.map((index) => index.personName).includes(otheruser.username)) {
        res.send({
          message: "you are already following the user"
        })
      } else {
        if (otheruser.followRequests.map((index) => index.personName).includes(currentuser.username)) {
          res.send({
            message: "you have already sent the request"
          })
        } else {
          await User.update(
            {username: req.params.otheruser},
            {
              $push: {
                followRequests: follower
              }
            }
          )
          res.send({
            message: "request has been sent to the user.",
            otheruser: otheruser.followRequests
          })
        }
      }
    }
    else {
      if (otheruser.followers.map((index) => index.personName).includes(currentuser.username) || 
          currentuser.following.map((index) => index.personName).includes(otheruser.username)) {
        res.send({
          message: "you are already following the user"
        })
      } else {
        await User.update(
          {username: req.params.otheruser},
          {
            $push: {
              followers: follower
            }
          }
        )
        await User.update(
          {username: req.params.currentuser},
          {
            $push: {
              following: followin
            }
          }
        )
        res.send({
          otherusers: otheruser.followers,
          currentusers: currentuser.following
        })
      }
    }
  } catch (error) {
    console.log(error)
  }
})

router.post('/removefollower/:currentuser/:otheruser', async(req, res) => {
  const otheruser = await User.findOne({username: req.params.otheruser})
  const currentuser = await User.findOne({username: req.params.currentuser})
  var follower = { personName: req.params.otheruser }
  var followin = { personName: req.params.currentuser }
  try {
    if (currentuser.followers.map((index) => index.personName).includes(otheruser.username)) {
      await User.update(
        {username: req.params.currentuser},
        {
          $pull: {
            followers: follower
          }
        }
      )
      await User.update(
        {username: req.params.otheruser},
        {
          $pull: {
            following: followin
          }
        }
      )
      res.send({
        message: "you have removed that person from your followers",
        username: otheruser.username
      })
    } else {
      res.send({
        message: "that person is not in your followers list"
      })
    }
  } catch (error) {
    console.log(error)
  }
})

router.post('/unfollow/:currentuser/:otheruser', async(req, res) => {
  const otheruser = await User.findOne({username: req.params.otheruser})
  const currentuser = await User.findOne({username: req.params.currentuser})
  var follower = { personName: req.params.otheruser }
  var followin = { personName: req.params.currentuser }
  try {
    if (currentuser.following.map((index) => index.personName).includes(otheruser.username)) {
      await User.update(
        {username: req.params.currentuser},
        {
          $pull: {
            following: follower
          }
        }
      )
      await User.update(
        {username: req.params.otheruser},
        {
          $pull: {
            followers: followin
          }
        }
      )
      res.send({
        message: "you have unfollowed that person",
        username: otheruser.username
      })
    } else {
      res.send({
        message: "you are not following that person"
      })
    }
  } catch (error) {
    console.log(error)
  }
})

router.post('/acceptfollow/:currentuser/:otheruser', async(req, res) => {
  const otheruser = await User.findOne({username: req.params.otheruser})
  const currentuser = await User.findOne({username: req.params.currentuser})
  var follower = { personName: req.params.otheruser }
  var followin = { personName: req.params.currentuser }
  try {
    if (currentuser.followRequests.map((index) => index.personName).includes(otheruser.username)) {
      await User.update(
        {username: req.params.currentuser},
        {
          $pull: {
            followRequests: follower
          },
          $push: {
            followers: follower
          }
        }
      )
      await User.update(
        {username: req.params.otheruser},
        {
          $push: {
            following: followin
          }
        }
      )
      res.send({
        message: "follow request accepted",
        username: otheruser.username
      })
    } else {
      res.send({
        message: "you have already accepted the request or they haven't sent you request"
      })
    }
    
  } catch (error) {
    console.log(error)
  }
})

router.post('/deletefollow/:currentuser/:otheruser', async(req, res) => {
  const otheruser = await User.findOne({username: req.params.otheruser})
  const currentuser = await User.findOne({username: req.params.currentuser})
  var follower = { personName: req.params.otheruser }
  var followin = { personName: req.params.currentuser }
  try {
    if (currentuser.followRequests.map((index) => index.personName).includes(otheruser.username)) {
      await User.update(
        {username: req.params.currentuser},
        {
          $pull: {
            followRequests: follower
          }
        }
      )
      res.send({
        message: "request from that person has been removed"
      })
    }
    else {
      res.send({
        message: "that person haven't send you request"
      })
    }
  } catch (error) {
    console.log(error)
  }
})

// this is just for testing
router.post('/test', async(req, res) => {
  const folo = [
    {personName: 'sdvhb'},
    {personName: 'frvds'}
  ]
  const sea = "sdvhb"
  const otheruser = await User.findOne({username: req.params.otheruser})
  const currentuser = await User.findOne({username: req.params.currentuser})
  res.send({
    message: otheruser.followRequests.map((index) => index.personName).includes(currentuser.username)
  })
})

module.exports = router