const Trip = require("../models/Trip");


exports.addPoiToTrip = (req, res) => {
  Trip.findById(req.body.tripId)
    .then(trip => { 
      console.log(trip.pois);
      console.log(req.body.poi);
      let result = trip.pois.filter(poi => poi.id === req.body.poi.id);
      console.log(result);

      if (result.length === 0) {
        console.log('hello');
        return Trip.updateOne(
          { _id: trip.id },
          { $push: { pois: req.body.poi } })
        .then(() => Trip.findById(req.body.tripId))
        .then(trip => res.json(trip))
      } else {
        console.log(trip);
        return res
          .status(400)
          .json({ poi: "That place already exists in your list" });
      }
      // console.log(req.body.poi.id);
      // console.log(trip.pois.includes(req.body.poi));
      // Trip.updateOne(
      //   { _id: trip.id },
      //   { $push: { pois: req.body.poi } })
      // .then(() => Trip.findById(req.body.tripId))
      // .then(trip => res.json(trip))

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

