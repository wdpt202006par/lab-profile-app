const express = require('express');
const authRoutes = express.Router();

const bcrypt = require('bcryptjs');

const User = require('../models/User.model');

// authRoutes.post('/signup', async
//   (req, res) => {
//     const { username, password, campus, course } = req.body;

//     if (!username || !password) {
//       res.status(400).json({ message: 'Provide username and password' });
//       return;
//     }

//     try {
//       const userFound = await User.findOne({username})

//     if (userFound) {
//       res.status(400).json({ message: 'User already exists' });
//       return;
//     }

//     const salt = bcrypt.genSaltSync(10);
//     const hashPass = bcrypt.hashSync(password, salt);

//     if (password.length < 7) {
//       res.status(400).json({
//         message:
//           'Please make your password at least 8 characters long for security purposes.',
//       });
//       return;
//     }

//     const user = await User.Create({ username, password : hashPass, campus, course })
//   console.log('User', User)
// }
//   catch(err){console.log (err)
//     res.status(500).json({message : "User can't be created"})}
//   })

authRoutes.post('/signup', (req, res, next) => {
  const { username, password, campus, course, image } = req.body;
  if (!username || !password) {
    res.status(400).json({ message: 'Provide username and password' });
    return;
  }

  if (password.length < 7) {
    res.status(400).json({
      message:
        'Please make your password at least 8 characters long for security purposes.',
    });
    return;
  }

  const salt = bcrypt.genSaltSync(10);
  const hashPass = bcrypt.hashSync(password, salt);

  User.create({ username, hashPass, campus, course, image })
    .then((user) => {
      console.log('User', user);
      req.session.user = user;
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(400).json({ message: 'Saving user to database went wrong.' });
    });
});

module.exports = authRoutes;
