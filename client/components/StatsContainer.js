import React, { useState, useEffect, useTimer } from 'react';
const StatsContainer = ({
  overallHighSpeedScore,
  highSpeedScore,
  currentSpeedScore,
  currentUser,
  gameMode,
}) => {
  console.log('from statscontainer, gameMode:', gameMode);
  console.log('from statscontainer, currentUser:', currentUser);

  useEffect(() => {}, [currentSpeedScore]);

  if (gameMode === 'reactionTime' && currentUser !== null) {
    console.log('in IF statement');
    return (
      <div className='statsContainer'>
        <h2>{`Your Previous Speed Score: ${
          currentSpeedScore ? currentSpeedScore + ' ms' : ''
        }`}</h2>
        <h2>{`Personal High Speed Score: ${
          currentUser.reactionGameScore
            ? currentUser.reactionGameScore + ' ms'
            : ''
        }`}</h2>
      </div>
    );
  }
};

export default StatsContainer;
