const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const PORT = 3000;
const capableHumanController = require('../controllers/capableHumanController')
const dotenv = require("dotenv").config();


app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get(
  '/',
  (req, res) => {
    console.log('inside SERVER');
    res.send('the response from server');
  }
);

//receiving requests for user sign up
app.post(
  '/signup',
  capableHumanController.createUser,
  (req, res) => {
    res.status(200).send('Account created')
  }
);

//receiving requests for user login
app.post(
  '/login',
  capableHumanController.getUser,
  (req, res) => {
    // console.log('inside server', res.locals.userName);
    res.send(res.locals.userName);
  }
);

//receiving requests for storing & updating score in reaction game
//post request should send { username: user1, score: 200 }  for example
app.post(
  '/reactionTimeScore',
  capableHumanController.updateReactionGameScore,
  (req, res) => {
    res.status(200).json({userHighScore: res.locals.userHighScore, overallHighScore: res.locals.overallTopScore});
  }
);


// static file-serving middleware
app.use(express.static(path.join(__dirname, '..', 'public')));

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});
