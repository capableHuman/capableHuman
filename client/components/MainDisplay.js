import React, { useState } from 'react';
import ReactionTimeButton from './ReactionTimeButton';
import NumberMemoryButton from './NumberMemoryButton';
import StatsContainer from './StatsContainer';
import VerbalMemory from './VerbalMemory';
import ReactionTimeGame from './ReactionTimeGame';
import NumberMemoryGame from './NumberMemoryGame';

import axios from 'axios';

const server = axios.create({
  baseURL: 'http://localhost:3000/',
});
import SignUp from './SignUp';
import Login from './Login';

const MainDisplay = ({
  gameMode,
  setGameMode,
  setCurrentUser,
  currentUser,
  setCurrentSpeedScore,
  currentSpeedScore,
  setHighSpeedScore,
  setOverallHighSpeedScore,
}) => {
  console.log('current gameMode state', gameMode);
  const [reactionTimeScore, setReactionTimeScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  const saveReactionTimeScore = (e) => {
    console.log('this is currentUser', currentUser.username);
    server
      .post('/saveReactionTimeScore', {
        username: currentUser.username,
        score: currentSpeedScore,
      })
      .then((res) => {
        const { userHighScore, overallHighScore } = res.data;
        console.log('line 40 on main display ', res.data);
        setHighSpeedScore(userHighScore);
        setOverallHighSpeedScore(overallHighScore);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (gameMode === 'reactionTime') {
    return (
      <div className='reactionTimeGame'>
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
            <button onClick={saveReactionTimeScore}>save score</button>
          </>
        ) : null}
      </div>
    );
  } else if (gameMode === 'numberMemoryGame') {
    return <NumberMemoryGame currentUser={currentUser} />;
  } else if (gameMode === 'signUp') {
    return (
      <>
        <SignUp setGameMode={setGameMode} />
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
        <NumberMemoryButton setGameMode={setGameMode} />
      </>
    );
};

export default MainDisplay;
