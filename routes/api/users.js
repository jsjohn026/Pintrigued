const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// users show
router.get('/:id', (req, res) => {
  User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err =>
      res.status(404).json({ nouserfound: 'User does not exist' })
    );
});


router.post('/register', (req, res) => {
  // Check to make sure nobody has already registered with a duplicate email
  
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        // Throw a 400 error if the email address already exists
        return res.status(400).json({email: "A user has already registered with this address"})
      } else {
        // Otherwise create a new user
        const newUser = new User({
          username: req.body.username,
          email: req.body.email,
          password: req.body.password
        })

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                const payload = { id: user.id, username: user.username };
  
                jwt.sign(payload, keys.secretOrKey, { expiresIn: 9800 }, (err, token) => {
                  res.json({
                    success: true,
                    token: "Bearer " + token
                  });
                });
              })
              .catch(err => console.log(err));
          });
        });
      }
    })
})


router.post('/login', (req, res) => {

  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }


  // const email = req.body.email;
  // const password = req.body.password;

  const { email, password } = req.body;

  User.findOne({email})
    .then(user => {
      if (!user) {
        errors.email = 'This user does not exist'
        // return res.status(404).json({email: 'This user does not exist'});
        return res.status(404).json(errors);
      }

      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            const payload = {id: user.id, username: user.username};
      
            jwt.sign(
              payload,
              keys.secretOrKey,
              // Tell the key to expire in one hour
              {expiresIn: 3600},
              (err, token) => {
                res.json({
                  success: true,
                  token: 'Bearer ' + token
                });
              });
          } else {
            errors.password = "Incorrect password";
            // console.log("Incorrect Password")
            return res.status(400).json(errors);
          }
        })
    })
})


// You may want to start commenting in information about your routes so that you can find the appropriate ones quickly.
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({ 
    id: req.user.id,
    username: req.user.username,
    email: req.user.email
  });
})


module.exports = router;