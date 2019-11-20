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

router.get('/:tripId', (req, res) => {
  Trip.findById(req.params.tripId)
    .then(trip => res.json(trip))
    .catch(err => res.status(404).json({ notripfound: "No trip found with that ID"} ));
});

router.post('/new',
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateTrip(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    let body_origin = String(req.body.origin);
    let body_destination = String(req.body.destination);

    let o1 = parseFloat(body_origin.split(', ')[0]);
    let o2 = parseFloat(body_origin.split(', ')[1]);
    let d1 = parseFloat(body_destination.split(', ')[0]);
    let d2 = parseFloat(body_destination.split(', ')[1]);

    const newTrip = new Trip({
      user: req.user.id,
      name: req.body.name,
      origin: [o1, o2],
      destination: [d1, d2]
    });

    newTrip.save().then(trip => res.json(trip));
  })

router.patch('/:tripId', (req, res) => {
  // console.log("hello");

  const { errors, isValid } = validateTrip(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  let body_origin = String(req.body.origin);
  let body_destination = String(req.body.destination);

  Trip.findById(req.params.tripId)
    .then(trip => {
      let o1 = body_origin.split(', ')[0];
      let o2 = body_origin.split(', ')[1];
      let d1 = body_destination.split(', ')[0];
      let d2 = body_destination.split(', ')[1];

      Trip.updateOne({ _id: trip.id }, { name: req.body.name, origin: [o1, o2], destination: [d1, d2] })
        .then(trip => res.json(trip));
    })
    .catch(err => res.status(404).json({ notripfound: "No trip found with that ID" }));
})

router.delete('/:tripId', (req, res) => {
  Trip.findById(req.params.tripId)
    .then(trip => {
      trip.remove().then(() => res.json(trip))
    })
    .catch(err => res.status(404).json({ notripfound: "No trip found with that ID" }));
});

module.exports = router;