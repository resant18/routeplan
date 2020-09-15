const Trip = require("../models/Trip");
const validateTrip = require("../validation/trip");

exports.getAllTrips = (req, res) => {
  Trip.find()
    .sort({ date: -1 })
    .then(trips => res.json(trips))
    .catch(err => res.status(404).json({ notripsfound: "No trips found" }));
};

exports.getUserTrips = (req, res) => {  
  const { userId, page } = req.params;

  Trip.find({ user: { _id: userId } })
    .skip( page > 0 ? (page - 1) * 6 : 0)
    .limit(6)
    .then(trips => res.json(trips))
    .catch(err =>
      res.status(404).json({ notripsfound: "No trip found with that ID" })
    );
};

exports.getTrip = (req, res) => {
  Trip.findById(req.params.tripId)
    .then(trip => res.json(trip))
    .catch(err =>
      res.status(404).json({ notripfound: "No trip found with that ID" })
    );
};

exports.createTrip = (req, res) => {
  const { errors, isValid } = validateTrip(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  // ** For testing from Postman only
  // let body_origin = String(req.body.origin);
  // let body_destination = String(req.body.destination);

  // let o1 = parseFloat(body_origin.split(", ")[0]);
  // let o2 = parseFloat(body_origin.split(", ")[1]);
  // let d1 = parseFloat(body_destination.split(", ")[0]);
  // let d2 = parseFloat(body_destination.split(", ")[1]);

  // const newTrip = new Trip({
  //   user: req.user.id,
  //   name: req.body.name,
  //   origin: [o1, o2],
  //   destination: [d1, d2]
  // });
  //====================

  const newTrip = new Trip({
    user: req.user.id,
    name: req.body.name,
    origin: req.body.origin,
    destination: req.body.destination
  });

  newTrip.save().then(trip => res.json(trip));
};

exports.updateTrip = (req, res) => {
  const { errors, isValid } = validateTrip(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  Trip.findById(req.params.tripId)
    .then(trip => {
      Trip.updateOne(
        { _id: trip.id },
        {
          name: req.body.name,
          origin: req.body.origin,
          destination: req.body.destination
        }
      ).then(trip => res.json(trip));
    })
    .catch(err =>
      res.status(404).json({ notripfound: "No trip found with that ID" })
    );
};

// ** For testing from Postman only
// exports.updateTrip = (req, res) => {
//     const { errors, isValid } = validateTrip(req.body);

//     if (!isValid) {
//       return res.status(400).json(errors);
//     }

//     let body_origin = String(req.body.origin);
//     let body_destination = String(req.body.destination);

//     Trip.findById(req.params.tripId)
//       .then(trip => {
//         let o1 = body_origin.split(", ")[0];
//         let o2 = body_origin.split(", ")[1];
//         let d1 = body_destination.split(", ")[0];
//         let d2 = body_destination.split(", ")[1];

//         Trip.updateOne(
//           { _id: trip.id },
//           { name: req.body.name, origin: [o1, o2], destination: [d1, d2] }
//         ).then(trip => res.json(trip));
//       })
//       .catch(err =>
//         res.status(404).json({ notripfound: "No trip found with that ID" })
//       );
// };

exports.deleteTrip = (req, res) => {
  Trip.findById(req.params.tripId)
    .then(trip => {
      trip.remove().then(() => res.json(trip));
    })
    .catch(err =>
      res.status(404).json({ notripfound: "No trip found with that ID" })
    );
};
