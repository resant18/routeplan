const express = require('express');
// const bcrypt = require('bcryptjs');
// const User = require('../../models/User');
// const jwt = require('jsonwebtoken');
// const keys = require('../../config/keys');
const passport = require('passport');
const usersController = require('../../controllers/users-controller');

// const validateRegisterInput = require('../../validation/register');
// const validateLoginInput = require('../../validation/login');

const router = express.Router();

router.get('/test', (req, res) => res.json({ msg: 'This is the users route' }));

router.get("/current", passport.authenticate('jwt', { session: false }), usersController.getCurrentUser);
router.post("/register", usersController.registerUser);
router.post("/login", usersController.loginUser);

module.exports = router;

