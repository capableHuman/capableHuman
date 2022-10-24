import React, { useState } from 'react';
import MainDisplay from './MainDisplay';
import Navbar from './Navbar';
import StatsContainer from './StatsContainer';
import { Route, Routes } from 'react-router-dom';

const MainContainer = () => {
  const [gameMode, setGameMode] = useState('mainPage');
  const [currentUser, setCurrentUser] = useState(null);
  const [currentSpeedScore, setCurrentSpeedScore] = useState(null);
  const [highSpeedScore, setHighSpeedScore] = useState(null);
  const [overallHighSpeedScore, setOverallHighSpeedScore] = useState(null);


  return (
    <div className='MainContainer'>
      <Routes>
        <Route
          path='/'
          element={
            <>
              <Navbar setGameMode={setGameMode} currentUser={currentUser} />
              <MainDisplay gameMode={gameMode} setGameMode={setGameMode} />
              <StatsContainer />
            </>
          }
        ></Route>
        <Route
          path='/reactionTime'
          element={
            <>
              <Navbar currentUser={currentUser} setGameMode={setGameMode} />
              <MainDisplay
                gameMode={gameMode}
                currentUser={currentUser}
                currentSpeedScore={currentSpeedScore}
                setCurrentSpeedScore={setCurrentSpeedScore}
                setHighSpeedScore={setHighSpeedScore}
                overallHighSpeedScore={overallHighSpeedScore}
                setOverallHighSpeedScore={setOverallHighSpeedScore}
              />
              <StatsContainer
                currentUser={currentUser}
                highSpeedScore={highSpeedScore}
                currentSpeedScore={currentSpeedScore}
                overallHighSpeedScore={overallHighSpeedScore}
                gameMode={gameMode}
              />
            </>
          }
        ></Route>
        <Route
          path='/numberMemory'
          element={
            <>
              <Navbar setGameMode={setGameMode} currentUser={currentUser} />
              <MainDisplay gameMode={gameMode} currentUser={currentUser} />
              <StatsContainer gameMode={gameMode} currentUser={currentUser} />  
            </>
          }
        ></Route>
        <Route
          path='/signUp'
          element={
            <>
              <Navbar setGameMode={setGameMode} />
              <MainDisplay setGameMode={setGameMode} gameMode={gameMode} />
            </>
          }
        ></Route>
        <Route
          path='/login'
          element={
            <>
              <Navbar setGameMode={setGameMode} />
              <MainDisplay
                gameMode={gameMode}
                setCurrentUser={setCurrentUser}
                setGameMode={setGameMode}
              />
            </>
          }
        ></Route>
      </Routes>
    </div>
  );
};

export default MainContainer;
