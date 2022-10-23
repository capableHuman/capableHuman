import React, { useState } from 'react';
// import SignUp from './SignUp';
// import Login from './Login';
import MainDisplay from './MainDisplay';
import SignUpButton from './SignUpButton';
import LoginButton from './LoginButton';

const Navbar = ({ setGameMode }) => {
  return (
    <div className="Navbar">
      <LoginButton setGameMode={setGameMode} />
      <SignUpButton setGameMode={setGameMode} />
    </div>
  );
};

export default Navbar;
