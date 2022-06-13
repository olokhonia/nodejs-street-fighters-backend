const { Router } = require('express');
const FighterService = require('../services/fighterService');
const { responseMiddleware } = require('../middlewares/response.middleware');
const {
    createFighterValid,
    updateFighterValid,
    fightersNotFound,
    fighterNotFoundById
} = require('../middlewares/fighter.validation.middleware');

const router = Router();

// TODO: Implement route controllers for fighter
// GET /api/fighters
router.get('/', (req, res, next) => {
    try {
        res.data = FighterService.getAll();
    } catch (err) {
        res.error = err;
    } finally {
        next();
    }
}, fightersNotFound, responseMiddleware);

// GET /api/fighters/:id
router.get('/:id', (req, res, next) => {
    try {
        res.data = FighterService.search({ "id": req.params.id });
    } catch (err) {
        res.error = err;
    } finally {
        next();
    }
}, fightersNotFound, responseMiddleware);

// POST /api/fighters
router.post('/', createFighterValid, (req, res, next) => {
    try {
        if (!res.error) {
            if (!req.body['health'] ||
                Number(req.body.health) < 80 ||
                Number(req.body.health) > 120) {
                req.body['health'] = 100;
            }

            res.data = FighterService.save(req.body);
        }
    } catch (err) {
        res.error = err;
    } finally {
        next();
    }
}, responseMiddleware);

// PUT /api/fighters/:id
router.put('/:id', updateFighterValid, fighterNotFoundById, (req, res, next) => {
    try {
        if (!res.error) {
            FighterService.update(req.params.id, req.body);
        }
    } catch (err) {
        res.error = err;
    } finally {
        next();
    }
}, responseMiddleware);

// DELETE /api/fighters/:id
router.delete('/:id', fighterNotFoundById, (req, res, next) => {
    try {
        FighterService.delete(req.params.id);
    } catch (err) {
        res.error = err;
    } finally {
        next();
    }
}, responseMiddleware);

module.exports = router;