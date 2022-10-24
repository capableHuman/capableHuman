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
    <>
      <button onClick={handleClickLogin} className='loginButton'>
        <img src='../capableHumanLogo.png' />
      </button>
    </>
  );
};

export default HomeButton;
