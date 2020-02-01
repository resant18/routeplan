const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const passport = require("passport");
const events = require("events");

const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

exports.getCurrentUser = (req, res) => {
  res.json({
    id: req.user.id,
    username: req.user.username,
    email: req.user.email
  });
};

// exports.getUser = (req, res) => {
//   const user = User.findOne({ _id: req.params.id }).then(user => user);
//   res.json({
//     id: req.params.id,
//     username: user.username,
//     email: user.email
//   });
// };

exports.hello = (req, res) => {
  User.findById(req.params.userId)
    .then(user => res.json(user))
    .catch(err =>
      res.status(404).json({ nouserfound: "No user found with that ID" })
    );
};

exports.registerUser = (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  // Check to make sure nobody has already registered with a duplicate email
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      // Throw a 400 error if the email address already exists
      return res
        .status(400)
        .json({ email: "A user has already registered with this address" });
    } else {
      // Otherwise create a new user
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
};

exports.loginUser = (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(404).json({ email: "This user does not exist" });
    }

    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = { id: user.id, username: user.username };

        jwt.sign(
          payload,
          keys.secretOrKey,
          // Tell the key to expire in one hour
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res.status(400).json({ password: "Incorrect password" });
      }
    });
  });
};
