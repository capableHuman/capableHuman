import React, { useState } from 'react';
import axios from 'axios';


const Login = ({setCurrentUser, setGameMode}) => {
  const server = axios.create({
    baseURL: 'http://localhost:3000/',
  });

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameInput = (e) => {
    e.preventDefault();
    setUserName(e.target.value);
  };

  const handlePasswordInput = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const submitForm = (e) => {
    //perform post request to the server
    // console.log(userName, email, password);
    if (userName.length === 0 || password.length === 0) {
      return;
    }
   
    server
      .post('/login', {
        username: userName,
        password: password,
      })
      .then((res) => setCurrentUser(res.data))
      .catch((err) => {
        console.error(err);
      });
      setGameMode('mainPage')
      console.log(`this is the user ${GameMode}`)
  }

  return (
    <div className="Login">
      <h3>Login here!</h3>
      <form>
        <>
          <label htmlFor="username">Username: </label>
          <input
            onChange={handleUsernameInput}
            id="username"
            name="username"
            type="text"
            required="required"
          ></input>
        </>
        <>
          <label htmlFor="password">Password: </label>
          <input
            onChange={handlePasswordInput}
            id="password"
            name="password"
            type="password"
            required="required"
          ></input>
        </>
        <input onClick={submitForm} type="button" value="submit" />
      </form>
    </div>
  );
};

export default Login;
