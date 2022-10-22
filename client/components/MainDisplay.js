import React, { useState } from 'react';
import ReactionTimeButton from './ReactionTimeButton';
import StatsContainer from './StatsContainer';
import VerbalMemory from './VerbalMemory';
import ReactionTimeGame from './ReactionTimeGame';

const MainDisplay = ({ gameMode, setGameMode }) => {
  const [reactionTimeScore, setReactionTimeScore] = useState(0);

  if (gameMode === 'reactionTime') {
    return (
      <>
        <ReactionTimeGame />
      </>
    );
  } else
    return (
      <>
        <ReactionTimeButton setGameMode={setGameMode} />
        <VerbalMemory />
      </>
    );
};

export default MainDisplay;
