const FightService = require("../services/fightService");
const { requiredProperty, propertyShouldNotBePresent } = require("./common.validation.middleware");

const createFightValid = (req, res, next) => {
    propertyShouldNotBePresent('id', req.body, res);

    requiredProperty('fighter1', req, res);
    requiredProperty('fighter2', req, res);
    requiredProperty('log', req, res);

    next();
}

const fightNotFound = (req, res, next) => {
    if (res.data === undefined || res.data.length === 0) {
        res.error = new Error('Fight(s) not found');
        res.error.status = 404;
    }

    next();
}

const fightNotFoundById = (req, res, next) => {
    const isFightExists = FightService.search({ "id": req.params.id });
    if (!isFightExists) {
        res.error = new Error(`Fight not found by ID: ${req.params.id}`);
        res.error.status = 404;
    }

    next();
}

exports.createFightValid = createFightValid;
exports.fightNotFound = fightNotFound;
exports.fightNotFoundById = fightNotFoundById;