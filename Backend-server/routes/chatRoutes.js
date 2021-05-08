const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Chats = mongoose.model('Chats');
const User = mongoose.model('User');

router.post('/chats/sendmessage', async(req, res) => {
  const {sender, receiver, message, isSeen} = req.body;
  if (!await User.findOne({username: sender}) && !await User.findOne({username: receiver})) {
    return res.status(422).send({error: "users doesn't exist cannot send message"})
  }
  try {
    const chat = new Chats({sender, receiver, message, isSeen})
    await chat.save();
    res.send(chat);
  } catch (error) {
    console.log(error)
  }
  
});

router.get('/chats/receivemessage/:sender/:receiver', async(req, res) => {
  const messages = await Chats.find({ $or: [
    {
      $and:[
        {sender: req.params.sender},
        {receiver: req.params.receiver}
      ]
    },
    {
      $and:[
        {sender: req.params.receiver},
        {receiver: req.params.sender}
      ]
    }
  ]})
  try {
    res.send({
      messages
    })
  } catch (error) {
    console.log(error)
  }
  
})

router.get('/chats/all/:sender', async(req, res) => {
  const allMessages = await Chats.find({sender: req.params.sender})
  // .map((index) => {
  //   return index.receiver
  // })
  function getUnique(arr, index) {
    const unique = arr
      .map(e => e[index])
      .map((e, i, final) => final.indexOf(e) === i && i)
      .filter(e => arr[e]).map(e => arr[e]);
    return unique;
  }
  try {
    // const inbox = await User.aggregate([
    //   {$unionWith: {coll: Chats}},
    //   {$group: {receiver: "$receiver"}}
    // ])
    const chats = getUnique(allMessages, 'receiver');
    
    res.send({
      chats
    })
  } catch (error) {
    console.log(error)
  }
})

module.exports = router