import React, { useEffect } from 'react';
import axios from 'axios';
import MainContainer from './components/MainContainer';

const server = axios.create({
  baseURL: 'http://localhost:3000/',
});
const handleClick = (e) => {
  e.preventDefault();
  // fetch('http://localhost:3000/')
  //   .then((response) => response.json())
  //   .then((data) => console.log(data));

  // fetch('http://example.com/movies.json')
  // .then((response) => response.json())
  // .then((data) => console.log(data));

  server
    .get('/')
    .then((res) => console.log(res))
    .catch((err) => {
      console.error(err);
    });
};

const App = () => {
  return (
    <div>
      <MainContainer />
    </div>
  );
};

export default App;
