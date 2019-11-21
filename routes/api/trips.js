const express = require("express");
const router = express.Router();
const passport = require("passport");
const tripsController = require('../../controllers/trips_controller');

// router.get("/test", (req, res) =>
//   res.json({ msg: "This is the tweets route" })
// );

router.get('/', tripsController.getAllTrips);
router.get('/:tripId', tripsController.getTrip);
router.post('/new', passport.authenticate("jwt", { session: false }), tripsController.createTrip);
router.patch('/:tripId', passport.authenticate("jwt", { session: false }), tripsController.updateTrip);
router.delete('/:tripId', passport.authenticate("jwt", { session: false }), tripsController.deleteTrip);

module.exports = router;