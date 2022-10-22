const db = require('../models/capableHumanModels');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const capableHumanController = {};

capableHumanController.createUser = async (req, res, next) => {
  //storing the query string to select for the last row in a variable
  const queryUserId = 'SELECT _id FROM public.accounts WHERE _id=(SELECT max(_id) FROM public.accounts)';
  
  //querying for the last row, then creating a variable to store the id from that row
  const idObj = await db.query(queryUserId);
  let id = idObj['rows'][0]['_id'];

  //Hashing password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //creating query string with incoming request body values, then storing the results of query in a variable 
  const queryCreateUserStr = "INSERT INTO public.accounts(_id, username, email, password) VALUES ($1, $2, $3, $4)";
  const values = [++id, `${req.body.username}`, `${req.body.email}`, `${hashedPassword}`]
  const newUser = await db.query(queryCreateUserStr, values);

  return next();
}

capableHumanController.getUser = async (req, res, next) => {
  // try {
  //storing the query string to select for the last row in a variable
  const query = {
    // give the query a unique name
    name: 'hello',
    text: 'SELECT * FROM public.accounts WHERE username = $1',
    values: [`${req.body.username}`],
  }
  // const user = 'SELECT * FROM public.accounts WHERE email = $1'
  // const values = [`${req.body.email}`];
  const isUser = await db.query(query);
  const userNameFound = isUser['rows'][0]['username']
  const hashedPass = isUser['rows'][0]['password'];
  console.log(userNameFound, hashedPass, req.body.password)

  // console.log('console starts here', userNameFound);

  if (userNameFound && (await bcrypt.compare(req.body.password, hashedPass))) {
    res.locals.userStatus = generateToken(isUser['rows'][0]['_id']);
    // res.locals.userStatus = 'great job you logged in buddy!';
  } else {
    res.status(400);
  }


  // //creating query string with incoming request body values, then storing the results of query in a variable 

  // const newUser = await db.query(queryCreateUserStr, values);

  return next();
}



const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};


module.exports = capableHumanController;