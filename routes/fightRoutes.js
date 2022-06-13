const { Router } = require('express');
const FightService = require('../services/fightService');
const { responseMiddleware } = require('../middlewares/response.middleware');
const { fightNotFound, fightNotFoundById, createFightValid } = require("../middlewares/fight.validation.middleware");

const router = Router();

// OPTIONAL TODO: Implement route controller for fights

router.get('/', (req, res, next) => {
    try {
        res.data = FightService.getAll();
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}, fightNotFound, responseMiddleware);

router.get('/fight/:id', (req, res, next) => {
    try {
        res.data = FightService.search({ id: req.params.id });
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}, fightNotFoundById, responseMiddleware);

router.post('/fight', createFightValid, (req, res, next) => {
    try {
        if (!res.err) {
            res.data = FightService.save(req.body);
        }
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

router.delete('/fight/:id', fightNotFoundById, (req, res, next) => {
    try {
        FightService.delete(req.params.id);
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

// TBD

module.exports = router;