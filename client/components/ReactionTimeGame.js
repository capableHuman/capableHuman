import React, { useEffect, useTimer, useState } from 'react';
// import ActiveReactionTimeGame from './ActiveReactionTimeGame';
const ReactionTimeGame = ({
  gameStarted,
  setGameStarted,
  currentSpeedScore,
  setCurrentSpeedScore,
}) => {
  const [clickable, setClickable] = useState(false);
  const [timerValue, setTimerValue] = useState(0);
  let clickSpeed = 0;
  let timerID;

  const startGame = (e) => {
    e.preventDefault();

    const setCountDown = Math.random() * 3 * 1000;
    setTimeout(() => {
      setGameStarted(true);
    }, setCountDown);
  };

  const toggleClickableAndStartTimer = () => {
    toggleClickable();
    startTimer();
  };

  const buttonStyles = {
    backgroundColor: gameStarted ? 'green' : 'red',
    width: '100%',
    height: '100%',
  };

  // const toggleClickable = (clickable) => {
  //   clickable ? setClickable(false) : setClickable(true);
  // };

  const startTimer = () => {
    timerID = setInterval(() => {
      clickSpeed += 5;
      console.log(clickSpeed);
    }, 1);
  };

  const getTime = () => {
    setCurrentSpeedScore(clickSpeed);
    setGameStarted(false);
  };

  useEffect(() => {
    console.log(gameStarted);
    if (gameStarted) {
      startTimer();
    }
    // conditional checking to see if game started is true
    // if so, startTimer
    return () => {
      console.log('from return statement of useEffect');
      console.log('your state is ', currentSpeedScore);
      clearInterval(timerID);
    };
  }, [gameStarted]);

  //  if clickable is true, display a green button that says click me!
  //   - this button should have a
  return (
    <>
      {gameStarted ? (
        <button onClick={getTime} style={buttonStyles}>
          <h1>Click Now!</h1>
        </button>
      ) : (
        <>
          <button style={buttonStyles} onClick={startGame}>
            <h1>Reaction Time Game</h1>
            <p>
              Click to start! When red box turns green, click as fast as you can
            </p>
          </button>
        </>
      )}
      {}
    </>
  );
};

export default ReactionTimeGame;
