const { user } = require('../models/user');
const userService = require('../services/userService');
const {
    requiredProperty,
    atLeastOneOfModeledPropertyExists,
    propertyShouldNotBePresent,
    notAllowedPropertiesShouldNotBePresent
} = require("./common.validation.middleware");

const createUserValid = (req, res, next) => {
    // TODO: Implement validator for user entity during creation
    // check required properties
    requiredProperty('firstName', req, res);
    requiredProperty('lastName', req, res);
    requiredProperty('email', req, res);
    requiredProperty('phoneNumber', req, res);
    requiredProperty('password', req, res);

    propertyShouldNotBePresent('id', req.body, res);
    // check that request body has modeled structure
    notAllowedPropertiesShouldNotBePresent(req.body, user, res);
    // Validate email if provided
    validateEmail(req.body.email, res);
    // Validate phoneNumber if provided
    validatePhoneNumber(req.body.phoneNumber, res);
    // Validate password if provided
    validatePassword(req.body.password, res);

    validateThatUserWithEmailDoesNotExists(req.body.email, res);
    validateThatUserWithPhoneDoesNoteExists(req.body.phoneNumber, res);

    next();
}

const updateUserValid = (req, res, next) => {
    // TODO: Implement validator for user entity during update
    // check that request body does not have specific properties
    propertyShouldNotBePresent('id', req.body, res);
    // check that request body has modeled structure
    // notAllowedPropertiesShouldNotBePresent(req.body, user, res);
    // Validate email if provided
    validateEmail(req.body.email, res);
    // Validate phoneNumber if provided
    validatePhoneNumber(req.body.phoneNumber, res);
    // Validate password if provided
    validatePassword(req.body.password, res);
    // validate that at least one of modeled property present 
    atLeastOneOfModeledPropertyExists(req.body, user, res);

    next();
}

const usersNotFound = (req, res, next) => {
    if (res.data === null || res.data.length === 0) {
        res.error = new Error('User(s) not found');
        res.error.status = 404;
    }

    next();
}

const userNotFoundById = (req, res, next) => {
    const isUserExists = userService.search({ "id": req.params.id });
    if (!isUserExists) {
        res.error = new Error(`User not found by ID: ${req.params.id}`);
        res.error.status = 404;
    }

    next();
}

const validateEmail = (email, res) => {
    if (email && !email.endsWith("@gmail.com")) {
        res.error = new Error('only gmail emails are allowed');
    }
}

const validatePhoneNumber = (phoneNumber, res) => {
    if (phoneNumber && (!phoneNumber.startsWith("+380") || phoneNumber.length !== 13)) {
        res.error = new Error('phoneNumber is not allowed, should be like +380xxxxxxxxx');
    }
}

const validatePassword = (password, res) => {
    if (password && password.length < 3) {
        res.error = new Error('password should not be less than 3 symbols');
    }
}

const validateThatUserWithEmailDoesNotExists = (email, res) => {
    const isUserWithTheSameEmailExists = userService.search({ "email": email });
    if (isUserWithTheSameEmailExists) {
        res.error = new Error(`User already exists with the same email ${email}`);
    }
}

const validateThatUserWithPhoneDoesNoteExists = (phoneNumber, res) => {
    const isUserWithTheSamePhoneExists = userService.search({ "phoneNumber": phoneNumber });
    if (isUserWithTheSamePhoneExists) {
        res.error = new Error(`User already exists with the same phoneNumber ${phoneNumber}`);
    }
}

exports.createUserValid = createUserValid;
exports.updateUserValid = updateUserValid;
exports.userNotFoundById = userNotFoundById;
exports.usersNotFound = usersNotFound;