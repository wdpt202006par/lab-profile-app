const mongoose =require('mongoose');
const Schema =  mongoose.Schema;

const userSchema = new  Schema({
  username: String,
  password: String,
  campus:['Madrid', 'Barcelona', 'Miami', 'Paris', 'Berlin', 'Amsterdam', 'México', 'Sao Paulo', 'Lisbon'],
  course: ['Web Dev', 'UX/UI', 'Data Analytics'],
  image:String
});

const User = mongoose.model('User', userSchema);

module.exports = User;

