// Package Dependencies
const express = require('express');
const mongoose = require('mongoose');
const users = require('./routes/api/users');
const tweets = require('./routes/api/tweets');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require("path");

// Local Dependencies
const DB_URL = require('./config/keys').mongoURI;
const User = require('./models/User');

// Instantiate Express Server
const app = express();

/**
 * MONGODB CONNECTION
 */
mongoose
  .connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch(err => console.log(err));
  

// Serve static assets and index.html in production
if (process.env.NODE_ENV === "production") {
  // Serve static assets
  app.use(express.static("frontend/build"));
  app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => res.send("Hello World!!"));
}

/**
 * MIDDLEWARE
 */
// setup middleware to parse incoming request
// urlencoded means to let server response json from other software (nested object) ), like Post,ans
app.use(passport.initialize());
require('./config/passport')(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
 * ROUTES
 */

// API Routes
// app.get('/', (req, res) => {        
//     // Test route
//     res.send('Hello World');

//     const user = new User({
//         username: 'windsor',
//         email: 'windsor@gmail.com',
//         password: 'windsornote'
//     });
//     user.save();
//     res.send('User is saved successfully');
    
// });

app.use('/api/users', users);
app.use('/api/tweets', tweets);


//Set server port
const port = process.env.PORT || 5000;

// tell Express to start a socket and listen for connections on the path
// and set server port
app.listen(port, () => console.log(`Server is running on port ${port}`));

