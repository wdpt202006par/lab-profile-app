const express    = require('express');
const authRoutes = express.Router();
const bcrypt     = require('bcryptjs');
const bcryptSalt = 10;

// require the user model !!!!
const User       = require('../models/User.model');


authRoutes.post('/signup', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const campus = req.body.campus;
  const course = req.body.course;
  
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
        username: username,
        password: hashPass,
        campus: campus,
        course: course
      });
    
      aNewUser.save()
        .then(() => {
          // Persist our new user into session
          req.session.currentUser = aNewUser;

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

authRoutes.post('/login', (req, res, next) => {
  const {username, password} = req.body;

  User.findOne({username}).then(user => {
    if (!user) {
      return next(new Error('No user with that username'));
    }
    
    // compareSync
    if (bcrypt.compareSync(password, user.password) !== true) {
      return next(new Error('Wrong credentials'));
    } else {
      req.session.currentUser = user;
      // res.json(user);
      res.redirect('/profile');
    }
  }).catch(next);
});

authRoutes.post('/logout', (req, res, next) => {
  req.session.destroy();
  res.json({message: 'Your are now logged out.'});
});

authRoutes.get('/loggedin', (req, res, next) => {
  if (req.session.currentUser) {
      res.status(200).json(req.session.currentUser);
      return;
  }
  res.status(403).json({ message: 'Unauthorized' });
});

authRoutes.post("/edit", (req, res, next) => {
  const { username, campus, course } = req.body;
  const id = req.session.currentUser._id
  
  if (!req.session.currentUser) {
    res.status(401).json({message: "You need to be logged in!"});
    return;
  }

  User.findByIdAndUpdate(id, { username, campus, course })
  .then(user => {
    res.status(200).json(user);

  })
  .catch(err => {
    res.json(err);
  });
});

module.exports = authRoutes;