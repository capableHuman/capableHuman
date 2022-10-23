import React, { useState } from 'react';
import ReactionTimeButton from './ReactionTimeButton';
import StatsContainer from './StatsContainer';
import VerbalMemory from './VerbalMemory';
import ReactionTimeGame from './ReactionTimeGame';
import SignUp from './SignUp';
import Login from './Login'

const MainDisplay = ({ gameMode, setGameMode, setCurrentUser }) => {
  console.log('current gameMode state', gameMode)
  const [reactionTimeScore, setReactionTimeScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  // if(gameMode === 'signUp') {
  //   return (
      
  //   )
  // }

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
  } else if (gameMode === 'signUp') {
    return (
      <>
        <SignUp />
      </>
    )
  } else if (gameMode === 'login') {
    return (
      <>
        <Login gameMode={gameMode} setGameMode={setGameMode} setCurrentUser={setCurrentUser} />
      </>
    )
  } 
  else
    return (
      <>
        <ReactionTimeButton setGameMode={setGameMode} />
        <VerbalMemory />
      </>
    );
};

export default MainDisplay;
