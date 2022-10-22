const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const PORT = 3000;

const capableHumanController = require('../controllers/capableHumanController')


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
  '/users',
  capableHumanController.createUser,
  (req, res) => {
    res.status(200).send('Account created')
  }
)

// static file-serving middleware
app.use(express.static(path.join(__dirname, '..', 'public')));

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});
