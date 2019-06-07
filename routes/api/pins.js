const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const Pin = require('../../models/Pin');
const validatePinInput = require('../../validation/pins');

// Get all Pins 
router.get('/', (req, res) => {
  Pin.find()
    .sort({ date: -1 })
    .then(pins => res.json(pins))
    .catch(err => res.status(404).json({ nopinsfound: 'No pins found' }));
});

// // Get all Pins by userId
// router.get('/user/:user_id', (req, res) => {
//   Pin.find({ user: req.params.user_id })
//     .then(pins => res.json(pins))
//     .catch(err =>
//       res.status(404).json({ nopinsfound: 'No pins found from that user' })
//     );
// });

// Get specific Pin by id
router.get('/:id', (req, res) => {
  Pin.findById(req.params.id)
    .then(pin => res.json(pin))
    .catch(err =>
      res.status(404).json({ nopinfound: 'No pin found with that ID' })
    );
});


<<<<<<< HEAD
//create
=======
//create ==> look at upload.js
>>>>>>> 512a15e411030e139b53287ef44f642c0d69f2dd


//update


//delete

module.exports = router;
