const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('users');
const keys = require('../config/keys');

// Passport options
const options = {};
// extract bearer token from the request header
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = keys.secretOrKey;

module.exports = passport => {
    // This passport use JSON Web Token strategy
  passport.use(new JwtStrategy(options, (jwt_payload, done) => {
    // This payload includes the items we specified above
    User.findById(jwt_payload.id)
        .then(user => {            
            if (user) {
              return done(null, user);
            } else {
              return done(null, false);
              // or create a new account here
            }
        })
        .catch(err => {
          console.log(err) ;
          return done(err, false);
        });
    })
  );
};
