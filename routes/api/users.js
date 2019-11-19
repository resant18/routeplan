const express = require('express');
const passport = require('passport');
const router = express.Router();
const usersController = require('../../controllers/users-controller');

router.get('/test', (req, res) => res.json({ msg: 'This is the users route' }));
router.get("/current", passport.authenticate('jwt', { session: false }), usersController.getCurrentUser);
router.post("/register", usersController.registerUser);
router.post("/login", usersController.loginUser);

module.exports = router;

