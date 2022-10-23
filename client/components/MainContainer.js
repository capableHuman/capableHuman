import React, { useState } from 'react';
import MainDisplay from './MainDisplay';
import Navbar from './Navbar';
import StatsContainer from './StatsContainer';
import { Route, Routes } from 'react-router-dom';

const MainContainer = () => {
  const [gameMode, setGameMode] = useState('mainPage');
  return (
    <div className='MainContainer'>
      <Routes>
        <Route
          path='/'
          element={
            <>
              <Navbar />
              <MainDisplay gameMode={gameMode} setGameMode={setGameMode} />
              <StatsContainer />
            </>
          }
        ></Route>
        <Route
          path='/reactionTime'
          element={
            <>
              <Navbar />
              <MainDisplay gameMode={gameMode} />
              <StatsContainer />
            </>
          }
        ></Route>
      </Routes>
    </div>
  );
};

export default MainContainer;
