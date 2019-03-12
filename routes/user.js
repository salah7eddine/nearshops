const express = require('express');
const router = express.Router();


const userControllers = require('../controllers/user');

router.get('/:userId', userControllers.getUser);

router.post('/login', userControllers.userLogin);

router.post('/signup', userControllers.userSignup);

router.delete('/:userId', userControllers.userDelete);

module.exports = router;