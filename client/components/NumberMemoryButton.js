import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NumberMemoryButton = ({ setGameMode }) => {
  const navigate = useNavigate();
  const handleClick = (e) => {
    e.preventDefault();
    navigate('/numberMemory');
    setGameMode('numberMemoryGame');
  };
  return (
    <button onClick={handleClick} className="numberMemoryGame">
      <h3>Number Memory</h3>
      <p>Test your number memory!</p>
    </button>
  );
};

export default NumberMemoryButton;
