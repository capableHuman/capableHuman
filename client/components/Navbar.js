import React, { useState } from 'react';
// import SignUp from './SignUp';
// import Login from './Login';
import MainDisplay from './MainDisplay';
import SignUpButton from './SignUpButton';
import LoginButton from './LoginButton';
import HomeButton from './HomeButton';

const Navbar = ({ setGameMode }) => {
  return (
    <div className="Navbar">
      <HomeButton setGameMode={setGameMode} />

      <div>
        <LoginButton setGameMode={setGameMode} />
        <SignUpButton setGameMode={setGameMode} />
      </div>
    </div>
  );
};

export default Navbar;
