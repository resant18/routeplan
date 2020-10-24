const Trip = require("../models/Trip");

exports.addPoiToTrip = (req, res) => {
  Trip.findById(req.body.tripId)
    .then(trip => {
      
      let result = trip.pois && trip.pois.filter(poi => poi.id === req.body.poi.id) || [];

      if (result.length === 0) {
        return Trip.updateOne(
          { _id: trip.id },
          { $push: { pois: req.body.poi } }
        )
          .then(() => Trip.findById(req.body.tripId))
          .then(trip => res.json(trip));
      } else {
        return res
          .status(403)
          .json({ poi: "That place already exists in your list" });
      }
    })
    .catch(err =>      {
      console.log(err);
      res.status(404).json({ notripfound: "No trip found with that ID" })
    }
    );
};

exports.removePoiFromTrip = (req, res) => {    
  let tripId = req.params.tripId; //"5f7ce4f5be202b00170f3b0f";
  let poiId = `pois.${req.params.poiId}`;

  Trip.updateOne({ _id: tripId }, { $unset: { [poiId]: 1 } })  
     .then((result) => {
        if (result.nModified > 0) {
           Trip.findOneAndUpdate(
              { _id: tripId },
              { $pull: { "pois": null } },
              { upsert: true,
                new: true, 
                useFindAndModify: true 
              })            
            .then((trip) => {
              if (trip) {
                 res.status(200).json(trip._doc);
              } else res.status(422).send({ message: "Poi is not deleted" });
            });
        } else {
           res.status(400).send({ message: "Poi is not found" });
        }
     })
     .catch((err) => {
        res.status(400).send({
           message: "Could not delete the poi"
        });
     });  
};
