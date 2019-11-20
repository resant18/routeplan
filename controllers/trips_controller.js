const Trip = require("../models/Trip");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require('../config/keys');
const passport = require("passport");
const events = require("events");

const validateTrip = require("../validation/trip");