const express = require("express");
const router = express.Router();
const passport = require("passport");
const poisController = require("../../controllers/pois_controller");

router.post(
  "/new",
  passport.authenticate("jwt", { session: false }),
  poisController.addPoiToTrip
);


module.exports = router;
