const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5
  },
  profilepic: {
    type: String,
    required: false,
    default: 'https://toppng.com/uploads/preview/instagram-default-profile-picture-11562973083brycehrmyv.png',
    unique: false
  },
  name: {
    type: String,
    required: false,
    unique: false
  },
  email: {
    type: String,
    required: false,
    unique: false
  },
  phone: {
    type: String,
    required: false,
    unique: false
  },
  bio: {
    type: String,
    required: false,
    maxlength: 150,
    unique: false
  },
  gender: {
    type: String,
    required: false,
    unique: false
  },
  birthday: {
    type: String,
    required: false,
    unique: false
  },
  private: {
    type: Boolean,
    default: false,
  },
  followers: {
    type: Number,
    default: 0,
  },
  following: {
    type: Number,
    default: 0,
  },
  posts: {
    type: Number,
    default: 0,
  }
});

userSchema.pre('save', function(next) {
  const user = this;
  if (!user.isModified('password')){
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err){
      return next(err);
    }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next()
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword) {
    const user = this;
    return new Promise((resolve, reject) => {
        bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
            if (err){
                return reject(err);
            }
            if ( !isMatch ) {
                return reject(err);
            }
            resolve(true);
        });
    })
    
}

// userSchema.methods.generateToken = (callBack) => {
//     var user = this;
//     var token = jwt.sign(user._id.toHexString(), process.env.SECRET);
//     user.token = token;
//     user.save((err, user) => {
//         if (err){
//             return callBack(err);
//         }
//         callBack(null, user);
//     });
// };

// userSchema.statics.findByToken = (token, callBack) => {
//     var user = this;
//     jwt.verify(token, process.env.SECRET, (err, decode) => {
//         user.findOne({"_id": decode, "token": token}, (err, user) => {
//             if(err) {
//                 return callBack(err);
//             }
//             callBack(null, user);
//         });
//     });
// };

mongoose.model('User', userSchema);
