const express    = require('express');
const authRoutes = express.Router();
const mongoose = require('mongoose');


const bcrypt     = require('bcryptjs');

// require the user model !!!!
const User= require('../models/User.model');


authRoutes.post('/signup', (req, res, next) => {
  // const username = req.body.username;
  // const password = req.body.password;
  const {username,password,campus,course,image} = req.body
  
  if (!username || !password) {
    res.status(400).json({ message: 'Provide username and password' });
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
        password: hashPass,
        campus:campus,
        course:course,
        image:image
      });
    
      aNewUser.save()
        .then(() => {
          // Persist our new user into session
          req.session.currentUser = aNewUser
          console.log('coucou')
         res.status(200).json(aNewUser);
        })
        .catch(err => {
          console.log('hello', err)
          res.status(400).json({ message: 'Saving user to database went wrong.' });
        })
      ;
    })
    .catch(err => {
      res.status(500).json({message: "Username check went bad."});
    })
  ;
});

authRoutes.post('/login', (req, res, next) => {
  const {username, password} = req.body

  User.findOne({username}).then(user => {
    if (!user) {
      return next(new Error('No user with that username'))
    }
    
    // compareSync
    if (bcrypt.compareSync(password, user.password) !== true) {
      return next(new Error('Wrong credentials'))
    } else {
      req.session.currentUser = user
      res.json(user)
    }
  }).catch(next)
})

authRoutes.post('/logout', (req, res, next) => {
  req.session.destroy()
  res.json({message: 'Your are now logged out.'})
});

authRoutes.get('/loggedin', (req, res, next) => {
  // req.isAuthenticated() is defined by passport
  if (req.session.currentUser) {
      res.status(200).json(req.session.currentUser);
      return;
  }
  res.status(403).json({ message: 'Unauthorized' });
});

// PUT route => to update a specific user
authRoutes.put('/user/:id', (req, res, next)=>{

  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  User.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      // console.log(coucou);
      res.json({ message: `User with ${req.params.id} is updated successfully.` });
    })
    .catch(err => {

      res.json(err);
    })
})

module.exports = authRoutes;