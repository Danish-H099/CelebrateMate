const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  name:{
    type:String,
    required:true
  }, // String is shorthand for {type: String}
  email:
  {
    type:String,
    required:true,
    unique:true
  },
  password:
  {
    type:String,
    required:true,
  }
});
const Users = mongoose.model('users',UserSchema);
module.exports = Users;