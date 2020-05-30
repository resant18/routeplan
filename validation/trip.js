const Validator = require("validator");
const validText = require("./valid-text");

module.exports = function validateTripInput(data) {
  let errors = {};

  data.name = validText(data.name) ? data.name : "";
  data.user = validText(data.user) ? data.user : "";

  if (Validator.isMongoId(data.user)) {
    errors.user = "Invalid user";
  }

  if (Validator.isEmpty(data.name)) {
    errors.text = "Name field is required";
  }

  if (Validator.isEmpty(String(data.origin))) {
    errors.text = "Origin field is required";
  }

  if (!Validator.isLatLong(data.origin.lat + "," + data.origin.lng)) {
    errors.origin = "Origin field is invalid";
  }

  if (Validator.isEmpty(String(data.destination))) {
    errors.text = "Destination field is required";
  }

  if (!Validator.isLatLong(data.destination.lat + "," + data.destination.lng)) {
    errors.destination = "Destination field is invalid";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};
