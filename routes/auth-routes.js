const { Router } = require('express');
const express = require('express');
const router  = express.Router();
const bcrypt = require('bcryptjs');


const User = require('../models/User.model');

//LOGIN
router.post('/login', (req, res, next) => {
  const { username, password } = req.body;

  User.findOne({username}).then(user => {
    if (!user) {
      return next(new Error('No user with that email'))
    }
    // compareSync
    if (bcrypt.compareSync(password, user.password) !== true) {
      return next(new Error('Wrong credentials'))
    } else {
      req.session.currentUser = user
      // res.json({message:'user logged'})
      res.json(user)


    }
  }).catch(next)

  // res.send('User logged');
});

//SIGNUP
router.post('/signup', (req, res, next) => {
  const { username, password, campus, course } = req.body;
  

  if (!username || !password || !campus || !course) {
    res.status(400).json({ message: 'Please provide all fields' });
    return;
  }
  if (password.length < 7) {
    res.status(400).json({ message: 'Please make your password at least 8 characters long for security purposes.' });
    return;
  }
  User.findOne({ username })
    .then(foundUser => {
      if (foundUser) {
        res.status(400).json({ message: 'Username taken. Choose another one.' });
        return;
      }
      const salt     = bcrypt.genSaltSync(10);
      const hashPass = bcrypt.hashSync(password, salt);
      const aNewUser = new User({
        username:username,
        password: hashPass
      });
      aNewUser.save()
        .then(() => {
          // Persist our new user into session
          req.session.currentUser = aNewUser
         res.status(200).json(aNewUser);
        })
        .catch(err => {
          res.status(400).json({ message: 'Saving user to database went wrong.' });
        })
      ;
    })
    .catch(err => {
      res.status(500).json({message: "Username check went bad."});
    })
  ;
  
  res.send('User created')
});
  


router.post('/edit', (req, res, next) => {
  const { username, campus, course } = req.body;

  res.send('User updated')
});

router.post('/logout', (req, res, next) => {
  req.session.destroy()
  // res.json({message: 'Your are now logged out.'})
  res.send('OK')
});

router.post('/loggedin', (req, res, next) => {
  res.send('User logged')
 });

module.exports = router;