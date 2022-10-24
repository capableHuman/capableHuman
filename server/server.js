const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const PORT = 3000;
const capableHumanController = require('../controllers/capableHumanController');
const dotenv = require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// static file-serving middleware
app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/', (req, res) => {
  console.log('inside SERVER');
  res.send('the response from server');
});

//receiving requests for user sign up
app.post('/signup', capableHumanController.createUser, (req, res) => {
  res.status(200).send('Account created');
});

//receiving requests for user login
app.post('/login', capableHumanController.getUser, (req, res) => {
  // console.log('inside server', res.locals.userName);
  res.send({
    username: res.locals.userName,
    reactionGameScore: res.locals.reactionScore,
    memoryGameScore: res.locals.memoryScore,
    numberGameScore: res.locals.numberScore,
  });
});

//receiving requests for storing & updating score in reaction game
//post request should send { username: user1, score: 200 }  for example
app.post(
  '/saveReactionTimeScore',
  capableHumanController.updateReactionGameScore,
  (req, res) => {
    res.status(200).json({
      userHighScore: res.locals.userHighScore,
      overallHighScore: res.locals.overallTopScore,
    });
  }
);

app.post(
  '/saveNumberGameScore',
  capableHumanController.updateNumberGameScore,
  (req, res) => {
    res.status(200).json({
      userHighLevel: res.locals.userHighLevel,
      overallHighLevel: res.locals.overallHighLevel,
    });
  }
);

//Vivian added a global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log('Global Error Handler:', errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});
