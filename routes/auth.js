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

// POST /auth/signup

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
  console.log(hashPass);

  User.create({ username, password: hashPass, campus, course, image })
    .then((user) => {
      console.log('User', user);
      req.session.user = user;
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(400).json({ message: 'Saving user to database went wrong.' });
    });
});

// POST /auth/login
authRoutes.post('/login', (req, res, next) => {
  const { username, password } = req.body;
  User.findOne({ username })
    .then((user) => {
      console.log('user', user);
      if (!user) {
        return next(new Error('No user with that email'));
      }
      // compareSync
      const checkPassword = bcrypt.compareSync(password, user.password);
      if (checkPassword !== true) {
        return next(new Error('Wrong credentials'));
      } else {
        req.session.currentUser = user;
        //console.log('session user', req.session.currentUser);
        res.json(user);
      }
    })
    .catch(next);
});

// POST /auth/edit
authRoutes.post('/edit', (req, res, next) => {
  const { username, course, campus } = req.body;
  const id = req.session.currentUser._id;
  console.log(id);
  User.findByIdAndUpdate(
    { _id: id },
    { username, course, campus },
    { new: true }
  )
    .then((newUser) => {
      console.log('new user', newUser);
      res.json(newUser);
    })
    .catch(next);
});

// POST /auth/logout
authRoutes.post('/logout', (req, res, next) => {
  req.session.destroy();
  res.json({ message: 'Your are now logged out.' });
});

// POST /auth/loggedin
authRoutes.get('/loggedin', (req, res, next) => {
  if (req.session.currentUser) {
    console.log('session', req.session.currentUser);
    res.status(200).json(req.session.currentUser);
    return;
  }
  res.status(403).json({ message: 'Unauthorized' });
});

module.exports = authRoutes;
