const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");


const Trip = require('../../models/Trip');
const validateTrip = require('../../validation/trip');


router.get("/test", (req, res) =>
  res.json({ msg: "This is the tweets route" })
);
router.get('/', (req, res) => {
  // res.json({ msg: "This is the trips route" })
  // debugger
  Trip.find()
    .then(trips => res.json(trips))
    .catch(err => res.status(404).json({ notripsfound: 'No trips found' }));
});

router.post('/new',
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateTrip(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newTrip = new Trip({
      user: req.user.id,
      name: req.body.name,
      origin: [37.789509, -122.413956],
      destination: [38.789509, -123.413956]
    });

    newTrip.save().then(trip => res.json(trip));
  })

module.exports = router;