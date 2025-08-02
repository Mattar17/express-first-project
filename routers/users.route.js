const express = require('express');
const usersController = require('../controllers/users.controller');
const router = express.Router();
const validateToken = require('../middlewares/validateToken');
const authorize = require('../middlewares/authorize')

router.get('/', validateToken, authorize('admin'), usersController.getAllUsers);

router.post('/login', usersController.Login)

router.post('/register', usersController.Register);

module.exports = router;