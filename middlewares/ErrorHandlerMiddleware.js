const { ValidationError } = require('sequelize');
const HttpStatus = require('../utils/ResponseStatus')


function errorHandler(err, req, res, next) {
    let errors = [];
    let status = HttpStatus.BAD_REQUEST; // Default status code

    if (Array.isArray(err) && err[0].msg) {
        // Handle express-validator errors
        status = HttpStatus.BAD_REQUEST;
        errors = err.map(e => e.msg);
    } else if (err instanceof ValidationError) {
        // Handle Sequelize validation errors
        errors = err.errors.map(e => e.message);
    } else if (err.message) {
        // Handle custom errors
        status = err.status || HttpStatus.BAD_REQUEST;
        errors.push(err.message);
    } else {
        // Handle other types of errors
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        errors.push('Internal Server Error');
    }

    // Modify response format based on the number of errors
    if (errors.length === 1) {
        return res.status(status).json({ message: errors[0] });
    } else {
        return res.status(status).json({ message: 'Internal Server Error',errors: errors });
    }
}

module.exports = errorHandler;