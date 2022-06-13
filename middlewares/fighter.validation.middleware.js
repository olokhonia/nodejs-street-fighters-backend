const { fighter } = require('../models/fighter');
const FighterService = require("../services/fighterService");
const {
    requiredProperty,
    atLeastOneOfModeledPropertyExists,
    propertyShouldNotBePresent,
    notAllowedPropertiesShouldNotBePresent
} = require("./common.validation.middleware");

const createFighterValid = (req, res, next) => {
    // TODO: Implement validator for fighter entity during creation

    // check that specific property is not present
    propertyShouldNotBePresent('id', req.body, res);
    // check required properties
    requiredProperty('name', req, res);
    requiredProperty('power', req, res);
    requiredProperty('defense', req, res);
    // check that request body has modeled structure
    notAllowedPropertiesShouldNotBePresent(req.body, fighter, res);
    // power - number, 1 < power < 100
    if (!(Number(req.body.power) >= 1 && Number(req.body.power) <= 100)) {
        res.error = new Error(`power should be between 1 and 100, but set as ${Number(req.body.power)}`);
    }
    // defense - number, 1 < defense < 10
    if (!(Number(req.body.defense) >= 1 && Number(req.body.defense) <= 10)) {
        res.error = new Error(`defense should be between 1 and 10, but set as ${Number(req.body.defense)}`);
    }

    validateThatFighterWithNameDoesNotExists(req.body.name, res);

    next();
}

const updateFighterValid = (req, res, next) => {
    // TODO: Implement validator for fighter entity during update

    // validate that at least one of modeled property present
    atLeastOneOfModeledPropertyExists(req.body, fighter, res);

    next();
}

const fightersNotFound = (req, res, next) => {
    if (res.data === undefined || res.data.length === 0) {
        res.error = new Error('Fighter(s) not found');
        res.error.status = 404;
    }

    next();
}

const fighterNotFoundById = (req, res, next) => {
    const isFighterExists = FighterService.search({ "id": req.params.id });
    if (!isFighterExists) {
        res.error = new Error(`Fighter not found by ID: ${req.params.id}`);
        res.error.status = 404;
    }

    next();
}

const validateThatFighterWithNameDoesNotExists = (name, res) => {
    const isFighterWithTheNameExists = FighterService.search({ "name": name });
    if (isFighterWithTheNameExists) {
        res.error = new Error(`Fighter already exists with the same name ${name}`);
    }
}

exports.createFighterValid = createFighterValid;
exports.updateFighterValid = updateFighterValid;
exports.fightersNotFound = fightersNotFound;
exports.fighterNotFoundById = fighterNotFoundById;