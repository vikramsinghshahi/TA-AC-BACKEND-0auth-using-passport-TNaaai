let mongoose = require('mongoose');
// let bcrypt = require('bcrypt');

let Schema = mongoose.Schema;

let userSchema = new Schema(
  {
    name:  String, 
    email: { type: String, require: true, unique: true },
    username: { type: String, require: true, unique:true },
    photo: { type: String}
  },
  { timestamps: true }
);


let User = mongoose.model('User', userSchema);
module.exports = User;