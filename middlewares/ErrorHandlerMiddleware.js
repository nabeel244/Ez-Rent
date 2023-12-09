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
        errors = err.errors.map(e => {
            // Check for unique constraint error on the 'email' field
            if (e.type === 'unique violation' && e.path === 'email') {
                return 'email already taken'; // Custom error message
            }
            if (e.type === 'unique violation' && e.path === 'name') {
                return 'username is not available'; // Custom error message
            }
            return e.message;
        });
    } else if (err.name === 'SequelizeUniqueConstraintError') {
        // Handle Sequelize unique constraint errors (outside of validation errors)
        // err.errors.forEach(error => {
           
        //     if (error.path === 'email') {
        //         errors.push('email already taken');
               
        //     } else if (error.path === 'name') {
        //         error.push('username is not available')
        //     } 
        //     else {
        //         errors.push(error.message);
        //     }
        // });
        status = HttpStatus.CONFLICT; // 409 Conflict
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
        return res.status(status).json({ message: 'Internal Server Error', errors: errors });
    }
}


///////////////////////////////// OLD FUNCITON FOR ERROR HANDLING ///////////////////////

// function errorHandler(err, req, res, next) {
//     let errors = [];
//     let status = HttpStatus.BAD_REQUEST; // Default status code

//     if (Array.isArray(err) && err[0].msg) {
//         // Handle express-validator errors
//         status = HttpStatus.BAD_REQUEST;
//         errors = err.map(e => e.msg);
//     } else if (err instanceof ValidationError) {
//         // Handle Sequelize validation errors
//         errors = err.errors.map(e => e.message);
//     } else if (err.message) {
//         // Handle custom errors
//         status = err.status || HttpStatus.BAD_REQUEST;
//         errors.push(err.message);
//     } else {
//         // Handle other types of errors
//         status = HttpStatus.INTERNAL_SERVER_ERROR;
//         errors.push('Internal Server Error');
//     }

//     // Modify response format based on the number of errors
//     if (errors.length === 1) {
//         return res.status(status).json({ message: errors[0] });
//     } else {
//         return res.status(status).json({ message: 'Internal Server Error',errors: errors });
//     }
// }

module.exports = errorHandler;