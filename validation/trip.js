const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateTripInput(data) {
    let errors = [];

    data.name = validText(data.name) ? data.name : '';    


    if (Validator.isEmpty(data.name)) {
        errors.text = 'Name field is required';
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    };
}