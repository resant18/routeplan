const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateTripInput(data) {
    let errors = {};

    data.name = validText(data.name) ? data.name : '';
    data.user = validText(data.user) ? data.user : '';    


    if (Validator.isMongoId(data.user)) {
        errors.user = 'Invalid user';
    }

    if (Validator.isEmpty(data.name)) {
        errors.text = 'Name field is required';
    }

    if (!Validator.isLatLong(String(data.origin))) {
        errors.origin = 'Origin field is invalid';
    }

    if (!Validator.isLatLong(String(data.destination))) {
        errors.destination = 'Destination field is invalid';
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    };
}