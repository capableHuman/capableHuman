import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const ReactionTimeButton = ({ setGameMode }) => {
  const navigate = useNavigate();
  const handleClick = (e) => {
    e.preventDefault();
    navigate('/reactionTime');
    setGameMode('reactionTime');
  };
  return (
    <button onClick={handleClick} className="ReactionTimeButton">
      <h3>Reaction Time</h3>
      <p>Test your reflexes!</p>
    </button>
  );
};

export default ReactionTimeButton;
