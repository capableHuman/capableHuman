import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginButton = ({ setGameMode }) => {
    const navigate = useNavigate();
    const handleClickLogin = (e) => {
      e.preventDefault();
      navigate('/login');
      setGameMode('login');
    };
    return (
      <button onClick={handleClickLogin} className="navRight signupLogin">
        <h3>Login</h3>
      </button>
    );
}

export default LoginButton;