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
    <button onClick={handleClick} className="ReactionTimeButton">
      <strong className="cardTitle">Number Memory</strong>
      <div className="fontAwesome">
        <i className="fa-solid fa-list-ol fa-2xl"></i>
      </div>
      <p>Test your number memory!</p>
    </button>
  );
};

export default NumberMemoryButton;
