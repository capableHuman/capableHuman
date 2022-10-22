import React, { useState } from 'react';
import ReactionTimeButton from './ReactionTimeButton';
import StatsContainer from './StatsContainer';
import VerbalMemory from './VerbalMemory';
import ReactionTimeGame from './ReactionTimeGame';

const MainDisplay = ({ gameMode, setGameMode }) => {
  const [reactionTimeScore, setReactionTimeScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  if (gameMode === 'reactionTime') {
    return (
      <>
        <ReactionTimeGame
          reactionTimeScore={reactionTimeScore}
          setReactionTimeScore={setReactionTimeScore}
          gameStarted={gameStarted}
          setGameStarted={setGameStarted}
        />
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
