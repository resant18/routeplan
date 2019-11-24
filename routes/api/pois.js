const express = require("express");
const router = express.Router();
const passport = require("passport");
const poisController = require("../../controllers/pois_controller");

router.post(
  "/new",
  passport.authenticate("jwt", { session: false }),
  poisController.addPoiToTrip
);

router.delete(
  "/:tripId/:poiId",
  passport.authenticate("jwt", { session: false }),
  poisController.removePoiFromTrip
);

module.exports = router;
