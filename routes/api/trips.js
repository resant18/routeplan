const express = require("express");
const router = express.Router();
const passport = require("passport");
const tripsController = require("../../controllers/trips_controller");

router.get("/", tripsController.getAllTrips);
debugger
router.get("/user/:userId", tripsController.getUserTrips);
// router.get("/:userId/:tripId", tripsController.getUserTrips);
router.get("/:tripId", tripsController.getTrip);
router.post(
  "/new",
  passport.authenticate("jwt", { session: false }),
  tripsController.createTrip
);
router.patch("/:tripId", tripsController.updateTrip);
router.delete("/:tripId", tripsController.deleteTrip);

module.exports = router;
