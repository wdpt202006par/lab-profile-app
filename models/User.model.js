const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  campus: {
    type: String,
    enum: [
      'Madrid',
      'Barcelona',
      'Paris',
      'Berlin',
      'Amsterdam',
      'México',
      'Sao Paulo',
      'Lisbon',
    ],
  },
  course: {
    type: String,
    enum: ['Web Dev', 'UX/UI', 'Data Analytics'],
  },
  image: { type: String, default: 'http://placehold.it/280x170' },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
