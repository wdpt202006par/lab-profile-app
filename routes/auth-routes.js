const express    = require('express');
const authRoutes = express.Router();

const bcrypt     = require('bcryptjs');

// require the user model !!!!
const User       = require('../models/user-model');


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
});