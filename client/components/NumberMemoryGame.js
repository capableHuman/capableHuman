import axios from 'axios';
import React, { useEffect, useTimer, useState } from 'react';

const NumberMemoryGame = ({ currentUser }) => {
  const [level, setLevel] = useState(1);
  const [targetNumber, setTargetNumber] = useState(null);
  const [userNumber, setUserNumber] = useState('');
  const [numberView, setNumberView] = useState(true);
  const [playing, setPlaying] = useState(true);
  const [userScore, setUserScore] = useState('');
  const [overallScore, setOverallScore] = useState('');

  useEffect(() => {
    setTargetNumber(getNewNumber());
    showTargetNumber();
  }, []);

  const handleChangeView = () => {
    setNumberView(false);
  };

  const getNewNumber = () => {
    // return Math.floor(Math.random() * digits);
    let number = '';
    for (let i = 0; i < level + 1; i++) {
      const numberToAdd = Math.floor(Math.random() * 10);
      number += numberToAdd;
    }
    return +number;
  };

  const showTargetNumber = () => {
    setTimeout(handleChangeView, level * 700);
  };

  const handleSubmit = () => {
    if (+userNumber != targetNumber) {
      setPlaying(false);
    } else {
      setLevel(level + 1);
      setTargetNumber(getNewNumber());
      setUserNumber('');
      setNumberView(true);
      showTargetNumber();
    }
  };

  const server = axios.create({
    baseURL: 'http://localhost:3000/',
  });

  const saveScore = (level) => {
    console.log(currentUser);
    console.log('level', level);
    server
      .post('/saveNumberGameScore', {
        username: currentUser.username,
        score: level,
      })
      .then((res) => {
        const { userHighLevel, overallHighLevel } = res.data;
        setUserScore(res.data.userHighLevel);
        setOverallScore(res.data.overallHighLevel);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //screen to start game

  //player needs to remember the number before the Timer expires

  //What was the number? input field & submit button

  //screen that compares the number and your answer. Shows the level.

  //Next game button.

  /*
    Notes:
    - number increases by 1 digit for each round
    - time allowed increases every round
     */
  return playing ? (
    numberView ? (
      <div>{targetNumber}</div>
    ) : (
      <>
        <input
          type="text"
          value={userNumber}
          onChange={(e) => setUserNumber(e.target.value)}
        ></input>
        <button type="button" onClick={handleSubmit}>
          Submit
        </button>
      </>
    )
  ) : (
    <>
      <div>You lose! You made it to level {level}</div>
      <button onClick={() => saveScore(level)}>Save Level</button>
      <div>Personal High Level: {currentUser.numberGameScore}</div>
      <div>Overall High Level: {overallScore}</div>
    </>  // numberGameScore
  );
};

export default NumberMemoryGame;
