const express = require('express');
const authRoutes = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User.model');

// SIGNUP ROUTE
authRoutes.post('/signup', (req, res, next) => {
  const { username, password, campus, course } = req.body;

  if (!username || !password || !campus || !course) {
    res.status(400).json({ message: 'Provide all the informations' });
  }

  const salt = bcrypt.genSaltSync(10);
  const hashPass = bcrypt.hashSync(password, salt);

  User.create({ username, password: hashPass, campus, course })
    .then((userFromDB) => {
      res.status(200).json(username);
    })
    .catch((err) => {
      res.status(400).json({ message: 'Create user went wrong' });
    });
});

// LOGIN
authRoutes.post('/login', (req, res, next) => {
  const { username, password } = req.body;

  User.findOne({ username })
    .then((user) => {
      if (!user) {
        res.status(400).json({ message: 'User not found' });
        return;
      }

      if (bcrypt.compareSync(password, user.password) !== true) {
        res.status(400).json({ message: 'Wrong password' });
        return;
      } else {
        req.session.user = user;
        res.status(200).json(user);
      }
    })
    .catch((err) => {
      res.status(400).json({ message: 'password went wrong' });
    });
});

// LOG OUT
authRoutes.post('/logout', (req, res, next) => {
  req.session.destroy();
  res.status(200).json({ message: 'Your are now logged out' });
});

// LOGGED IN
authRoutes.get('/loggedin', (req, res, next) => {
  if (req.session.user) {
    res.status(200).json(req.session.user);
    return;
  }
  res.status(403).json({ message: 'Unauthorized' });
});

//UPLOAD

//EDIT
authRoutes.put('/edit', (req, res, next) => {
  const { username, campus, course } = req.body;

  User.findByIdAndUpdate(
    req.params.id,
    {
      username,
      campus,
      course,
    },
    { new: true }
  )
    .then((user) => {
      req.session.user = user;
      res.status(200).json({ message: 'user updated' });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

module.exports = authRoutes;
