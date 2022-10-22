import React, { useState } from 'react';
import SignUp from './SignUp';
import Login from './Login';
import MainDisplay from './MainDisplay';

const Navbar = () => {
  return (
    <div className="Navbar">
      <Login />
      <SignUp />
    </div>
  );
};

export default Navbar;
