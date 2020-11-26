const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
//fjzipfjme
const userSchema = new Schema({
  username: {type: String},
  password:  {type: String},
  campus: {type: String, enum:["Madrid","Barcelone","Miami","Paris","Berlin","Amsterdam","Mexico","Sao Paulo","Lisbon" ]},
  course:{type: String,enum:["Web Dev","UX UI","Data Analytics",]},
  image:{type: String}
}, 
{
  timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;