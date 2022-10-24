import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import Logo from '../client/capableHumanLogo.png'
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
        <img src='' />
      </button>
    </>
  );
};

export default HomeButton;
