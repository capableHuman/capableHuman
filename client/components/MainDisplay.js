import React, { useState } from 'react';
import ReactionTimeButton from './ReactionTimeButton';
import StatsContainer from './StatsContainer';
import VerbalMemory from './VerbalMemory';
import ReactionTimeGame from './ReactionTimeGame';

const MainDisplay = ({ gameMode, setGameMode }) => {
  const [reactionTimeScore, setReactionTimeScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentSpeedScore, setCurrentSpeedScore] = useState(null);

// const saveReactionTimeScore = (e) => {
//   axios.post('/')
// }

  if (gameMode === 'reactionTime') {
    return (
      <>
        <ReactionTimeGame
          reactionTimeScore={reactionTimeScore}
          setReactionTimeScore={setReactionTimeScore}
          gameStarted={gameStarted}
          setGameStarted={setGameStarted}
          currentSpeedScore={currentSpeedScore}
          setCurrentSpeedScore={setCurrentSpeedScore}
        />
        {currentSpeedScore ? 
        (<>
        <p>your previous score {currentSpeedScore}</p>
        <button>save score</button>
        </>) 
        : null}
      </>
    );
  } // default mainPage
  else
    return (
      <>
        <ReactionTimeButton setGameMode={setGameMode} />
        <VerbalMemory />
      </>
    );
};

export default MainDisplay;
