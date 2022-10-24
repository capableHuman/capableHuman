const db = require('../models/capableHumanModels');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const capableHumanController = {};

capableHumanController.createUser = async (req, res, next) => {
  //storing the query string to select for the last row in a variable
  const queryUserId = 'SELECT _id FROM public.accounts WHERE _id=(SELECT max(_id) FROM public.accounts)';
  
/*
const { username, email, password } = req.body;
  console.log(username, email, password);

  if (!username || !email || !password) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  //Check if user exists
  const findUserName = 'SELECT _id FROM public.accounts WHERE username = )'
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }
*/

  //querying for the last row, then creating a variable to store the id from that row
  let id;
  const idObj = await db.query(queryUserId);
  if (idObj['rows'].length > 0) {
    id = idObj['rows'][0]['_id'];
  } else {
    id = 0;
  }

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
  if (isUser['rows'].length === 0) return next({
    log: 'Error in capableHuman.getUser',
    status: 400,
    message: { err: 'Sorry, user not found' }
  });
  const userNameFound = isUser['rows'][0]['username'];
  const userId = isUser['rows'][0]['_id'];
  const hashedPass = isUser['rows'][0]['password'];
  console.log(userNameFound, hashedPass, req.body.password)

  // console.log('console starts here', userNameFound);

  if (userNameFound && (await bcrypt.compare(req.body.password, hashedPass))) {
    // res.locals.userStatus = generateToken(isUser['rows'][0]['_id']);

  //**Vivian added code here**/
    //query db for the 3 scores
    let reactGameStr = 'SELECT highscore FROM reactiongame WHERE _id = $1'
    let values = [userId];
    let reactionScore = await db.query(reactGameStr, values);
    if (reactionScore['rows'].length === 0) {
      res.locals.reactionScore = 0;
    } else {
      res.locals.reactionScore = reactionScore['rows'][0]['highscore'];
    }

    let memoryGameStr = 'SELECT highscore FROM memorygame WHERE _id = $1'
    let memoryScore = await db.query(memoryGameStr, values);
    if (memoryScore['rows'].length === 0) {
      res.locals.memoryScore = 0;
    } else {
      res.locals.memoryScore = memoryScore['rows'][0]['highscore'];
    }

    let numberGameStr = 'SELECT highscore FROM numbergame WHERE _id = $1'
    let numberScore = await db.query(numberGameStr, values);
    if (numberScore['rows'].length === 0) {
      res.locals.numberScore = 0;
    } else {
      res.locals.numberScore = numberScore['rows'][0]['highscore'];
    }

    res.locals.userName = userNameFound;
    console.log('username here', res.locals.userName, 'reaction game score', res.locals.reactionScore, 'memory game score', res.locals.memoryScore);
    // res.locals.userStatus = 'great job you logged in buddy!';
  } else {
    res.status(400);
  }

  // //creating query string with incoming request body values, then storing the results of query in a variable 

  // const newUser = await db.query(queryCreateUserStr, values);

  return next();
}

//**Vivian edited code from here**
capableHumanController.updateReactionGameScore = async (req, res, next) => {
  const { username, score } = req.body;

  //first check if the user's score is defined in the table already w/ a query
  const accountsQuery = {
    name: 'reactionGameUserExists',
    text: 'SELECT * FROM public.accounts WHERE username = $1',
    values: [`${req.body.username}`],
  }
  const userObj = await db.query(accountsQuery);
  if (userObj['rows'].length === 0) throw new Error('Please input a valid username in the system');
  const reactionGameId = userObj['rows'][0]['reactiongame_id'];
  const currUserId = userObj['rows'][0]['_id'];

  //Case 1: reactionGameId is null, this is the user's first time playing
  if (!reactionGameId) {
    //(1) Insert the currently passed in score as the value in the parent table (reactionGame)
    const reactGameQueryStr = "INSERT INTO reactiongame VALUES($1, $2)"
    const values = [currUserId, score];
    db.query(reactGameQueryStr, values);

    //(2) Update the foreign key in the parent table (accounts)
    const fkUpdateQuery = {
      name: 'foreign key query',
      text: "UPDATE accounts SET reactiongame_id = $1 WHERE _id = $2",
      values: [currUserId, currUserId],
    }
    db.query(fkUpdateQuery);
    res.locals.userHighScore = score;
  } 
  //Case 2: reactionGameId is not null
  //return new high score or their previous score if their time is greater than the one in the db
  else {
    //(1) check if the current score is less than the stored score in the database
    let scoreQuery = "SELECT highscore FROM reactiongame WHERE _id = $1"
    const values = [currUserId];
    const user = await db.query(scoreQuery, values);
    const dbScore = user['rows'][0]['highscore'];
    if (Number(score) < Number(dbScore)) {
      scoreQuery = "UPDATE reactiongame SET highscore = $1 WHERE _id = $2"
      const values = [score, currUserId];
      db.query(scoreQuery, values);
      res.locals.userHighScore = score;
    } 
    //if score in DB is lower, then we want to just return that score back to the user
    else if (dbScore <= score) {
      res.locals.userHighScore = dbScore;
    }
  }
  
  //return top score among all scores in the table reactionGame
  let topScoreQuery = 'SELECT highscore FROM reactiongame WHERE highscore=(SELECT min(highscore) FROM reactiongame)'
  const topScores = await db.query(topScoreQuery);
  res.locals.overallTopScore = topScores['rows'][0]['highscore'];
  return next();
}

//Number Memory Game Method
capableHumanController.updateNumberGameScore = async (req, res, next) => {
  const { username, score } = req.body;

  //first check if the user's score is defined in the table already w/ a query
  const accountsQuery = {
    name: 'numberGameUserExists',
    text: 'SELECT * FROM public.accounts WHERE username = $1',
    values: [`${req.body.username}`],
  }
  const userObj = await db.query(accountsQuery);
  if (userObj['rows'].length === 0) throw new Error('Please input a valid username in the system');
  const numberGameId = userObj['rows'][0]['numbergame_id'];
  const currUserId = userObj['rows'][0]['_id'];

  //Case 1: numberGameId is null, this is the user's first time playing
  if (!numberGameId) {
    //(1) Insert the currently passed in score as the value in the parent table (numberGame)
    const numberGameQueryStr = "INSERT INTO numbergame VALUES($1, $2)"
    const values = [currUserId, score];
    db.query(numberGameQueryStr, values);

    //(2) Update the foreign key in the parent table (accounts)
    const fkUpdateQuery = {
      name: 'foreign key query',
      text: "UPDATE accounts SET numbergame_id = $1 WHERE _id = $2",
      values: [currUserId, currUserId],
    }
    db.query(fkUpdateQuery);
    res.locals.userHighLevel = score;
  } 
  //Case 2: reactionGameId is not null
  //return new high score or their previous score if the entry in the db is higher //IN THE DB - LEVEL 2 //CURR SCORE - LEVEL 5 
  else {
    //(1) check if the current score is higher than the score in the database
    let scoreQuery = "SELECT highscore FROM numbergame WHERE _id = $1"
    const values = [currUserId];
    const user = await db.query(scoreQuery, values);
    const dbScore = user['rows'][0]['highscore'];

    if (Number(score) > Number(dbScore)) {
      scoreQuery = "UPDATE numbergame SET highscore = $1 WHERE _id = $2"
      const values = [score, currUserId];
      db.query(scoreQuery, values);
      res.locals.userHighLevel = score;
    } 
    //if score in DB is lower, then we want to just return that score back to the user
    else if (Number(dbScore) >= Number(score)) {
      res.locals.userHighLevel = dbScore;
    }
  }
  
  //return top score among all scores in the table numberGame
  let topScoreQuery = 'SELECT highscore FROM numbergame WHERE highscore=(SELECT max(highscore) FROM numbergame)'
  const topScores = await db.query(topScoreQuery);
  res.locals.overallHighLevel = topScores['rows'][0]['highscore'];
  return next();
}

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};


module.exports = capableHumanController;