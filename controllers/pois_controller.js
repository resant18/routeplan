const Trip = require("../models/Trip");


exports.addPoiToTrip = (req, res) => {
  Trip.findById(req.body.tripId)
    .then(trip => { 
      let result = trip.pois.filter(poi => poi.id === req.body.poi.id);

      if (result.length === 0) {
        return Trip.updateOne(
          { _id: trip.id },
          { $push: { pois: req.body.poi } })
        .then(() => Trip.findById(req.body.tripId))
        .then(trip => res.json(trip))
      } else {
        return res
          .status(403)
          .json({ poi: "That place already exists in your list" });
      }
    })
    .catch(err =>
      res.status(404).json({ notripfound: "No trip found with that ID" })
    );
};

exports.removePoiFromTrip = (req, res) => {
  Trip.findById(req.body.tripId)
    .then(trip => {
      Trip.updateOne({ _id: trip.id }, { $pull: { pois: [req.body.poiId] } })
        .then(() => Trip.findById(req.body.tripId))
        .then(trip => res.json(trip));
    })
    .catch(err =>
      res.status(404).json({ notripfound: "No trip found with that ID" })
    );
}

