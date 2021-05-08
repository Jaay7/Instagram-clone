const express = require('express');
const http = require('http');
const cors = require('cors');
// const hostname = '192.168.0.102';
const hostname = '192.168.0.103';
// const hostname ='10.191.18.90';
// const hostname = '192.168.0.167';
const port = 3000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const { mongoUrl } = require('./keys');
const app = express();

require('./models/UserModel');
require('./models/ChatModels');
require('./models/PostsModel');

const requireToken = require('./middleware/requireToken');
const authRoutes = require('./routes/authRoutes')
const chatRoutes = require('./routes/chatRoutes')
const postRoutes = require('./routes/postRoutes')

app.use(bodyParser.json());
app.use(authRoutes)
app.use(chatRoutes)
app.use(postRoutes)
// mongoose.Promise = global.Promise

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
  console.log("connected to MongoDB");
});

mongoose.connection.on('error', (err) => {
  console.log("error obtained", err);
});

// app.use(cookieParser());
app.use(cors());
app.get('/', requireToken, (req, res) => {
  res.send({
    username: req.user.username,
    profilepic: req.user.profilepic,
    name: req.user.name,
    email: req.user.email,
    phone: req.user.phone,
    bio: req.user.bio,
    gender: req.user.gender,
    birthday: req.user.birthday,
    private: req.user.private,
    followers: req.user.followers,
    following: req.user.following,
    posts: req.user.posts
  })
})

const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
