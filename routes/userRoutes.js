const { Router } = require('express');
const UserService = require('../services/userService');
const { createUserValid, updateUserValid, usersNotFound, userNotFoundById } = require('../middlewares/user.validation.middleware');
const { responseMiddleware } = require('../middlewares/response.middleware');

const router = Router();

// TODO: Implement route controllers for user

// GET /api/users
router.get('/', (req, res, next) => {
    try {
        res.data = UserService.getUsers();
    } catch (err) {
        res.error = err;
    } finally {
        next();
    }
}, usersNotFound, responseMiddleware);

// GET /api/users/:id
router.get('/:id', (req, res, next) => {
    try {
        res.data = UserService.search({ "id": req.params.id });
    } catch (err) {
        res.error = err;
    } finally {
        next();
    }
}, usersNotFound, responseMiddleware);

// POST /api/users
router.post('/', createUserValid, (req, res, next) => {
    try {
        if (!res.error) {
            res.data = UserService.save(req.body);
        }
    } catch (err) {
        res.error = err;
    } finally {
        next();
    }
}, responseMiddleware);

// PUT /api/users/:id
router.put('/:id', updateUserValid, userNotFoundById, (req, res, next) => {
    try {
        if (!res.error) {
            UserService.update(req.params.id, req.body);
        }
    } catch (err) {
        res.error = err;
    } finally {
        next();
    }
}, responseMiddleware);

// DELETE /api/users/:id
router.delete('/:id', userNotFoundById, (req, res, next) => {
    try {
        UserService.delete(req.params.id);
    } catch (err) {
        res.error = err;
    } finally {
        next();
    }

}, responseMiddleware);

module.exports = router;