const Trip = require("../models/Trip");


exports.addPoiToTrip = (req, res) => {
  Trip.findById(req.params.tripId)
    .then(trip => {
      Trip.updateOne(
        { _id: trip.id },
        { $push: { pois: req.body.poi } }        
      ).then(trip => res.json(trip));
    })
    .catch(err =>
      res.status(404).json({ notripfound: "No trip found with that ID" })
    );
};

