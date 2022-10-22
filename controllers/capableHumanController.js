const db = require('../models/capableHumanModels')

const capableHumanController = {};

capableHumanController.createUser = async (req, res, next) => {
  //storing the query string to select for the last row in a variable
  const queryUserId = 'SELECT _id FROM public.accounts WHERE _id=(SELECT max(_id) FROM public.accounts)';
  
  //querying for the last row, then creating a variable to store the id from that row
  const idObj = await db.query(queryUserId);
  let id = idObj['rows'][0]['_id'];

  //creating query string with incoming request body values, then storing the results of query in a variable 
  const queryCreateUserStr = "INSERT INTO public.accounts(_id, username, email, password) VALUES ($1, $2, $3, $4)";
  const values = [++id, `${req.body.username}`, `${req.body.email}`, `${req.body.password}`]
  const newUser = await db.query(queryCreateUserStr, values);

  return next();
}






module.exports = capableHumanController;