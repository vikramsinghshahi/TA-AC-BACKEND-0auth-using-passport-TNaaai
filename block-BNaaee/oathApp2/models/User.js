var mongoose = require('mongoose');
// var { NotExtended } = require('http-errors');

var Schema = mongoose.Schema;

var userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    photo: { type: String },
  },
  { timestamps: true }
);

var User = mongoose.model('User', userSchema);

module.exports = User;


// let mongoose = require('mongoose');
// // let bcrypt = require('bcrypt');

// let Schema = mongoose.Schema;

// let userSchema = new Schema(
//   {
//     name:  String, 
//     email: { type: String, require: true, unique: true },
//     username: { type: String, require: true, unique:true },
//     photo: { type: String}
//   },
//   { timestamps: true }
// );


// let User = mongoose.model('User', userSchema);
// module.exports = User;