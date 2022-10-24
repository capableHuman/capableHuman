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
      <strong className="cardTitle">Reaction Time</strong>
      <div className="fontAwesome">
        <i className="fa-solid fa-bolt fa-2xl"></i>
      </div>

      <p>Test your reflexes!</p>
    </button>
  );
};

export default ReactionTimeButton;
