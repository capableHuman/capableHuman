import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomeButton = ({ setGameMode }) => {
  const navigate = useNavigate();
  const handleClickLogin = (e) => {
    e.preventDefault();
    navigate('/');
    setGameMode('mainPage');
  };
  return (
    <button onClick={handleClickLogin} className="homeButton">
      <img src="./Screen_Shot_2022-10-24_at_11.35.52_AM.png"></img>
    </button>
  );
};

export default HomeButton;
