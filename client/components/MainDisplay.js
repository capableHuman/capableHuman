import React, { useState } from 'react';
import ReactionTimeButton from './ReactionTimeButton';
import StatsContainer from './StatsContainer';
import VerbalMemory from './VerbalMemory';
import ReactionTimeGame from './ReactionTimeGame';
import axios from 'axios';

const server = axios.create({
  baseURL: 'http://localhost:3000/',
});
import SignUp from './SignUp';
import Login from './Login';

const MainDisplay = ({ gameMode, setGameMode, setCurrentUser, currentUser }) => {
  console.log('current gameMode state', gameMode);
  const [reactionTimeScore, setReactionTimeScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentSpeedScore, setCurrentSpeedScore] = useState(null);

  const saveReactionTimeScore = (e) => {
    server.post('/saveReactionTimeScore', { username: currentUser,
    })
  }

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
        {currentSpeedScore ? (
          <>
            <p>your previous score {currentSpeedScore}</p>
            <button onClick={saveReactionTimeScore}>save score</button>
          </>
        ) : null}
      </>
    );
  } else if (gameMode === 'signUp') {
    return (
      <>
        <SignUp />
      </>
    );
  } else if (gameMode === 'login') {
    return (
      <>
        <Login
          gameMode={gameMode}
          setGameMode={setGameMode}
          setCurrentUser={setCurrentUser}
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
