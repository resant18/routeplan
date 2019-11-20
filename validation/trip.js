const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateTripInput(data) {
    let errors = {};

    data.name = validText(data.name) ? data.name : '';
    data.user = validText(data.user) ? data.user : '';
    data.origin = validText(data.origin) ? data.origin : '';
    data.destination = validText(data.destination) ? data.destination : '';
    data.date = validText(data.date) ? data.date : '';


    if (Validator.isMongoId(data.user)) {
        errors.user = 'Invalid user';
    }

    if (Validator.isEmpty(data.name)) {
        errors.text = 'Name field is required';
    }

    if (!Validator.isLatLong(data.origin)) {
        errors.origin = 'Origin field is invalid';
    }

    if (!Validator.isLatLong(data.destination)) {
        errors.destination = 'Destination field is invalid';
    }

    if (Validator.toDate(data.date)) {
        errors.date = 'Date is invalid';
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    };
}