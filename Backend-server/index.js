const express = require('express');
const http = require('http');
const cors = require('cors');
const hostname = '192.168.0.102';
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
const fandfRoutes = require('./routes/fandfRoutes');

app.use(bodyParser.json());
app.use(authRoutes)
app.use(chatRoutes)
app.use(postRoutes)
app.use(fandfRoutes)
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
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
})
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
    followers: req.user.followers.length,
    following: req.user.following.length,
    posts: req.user.posts
  })
})

const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
