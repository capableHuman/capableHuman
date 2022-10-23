import React, { useState } from 'react';
import MainDisplay from './MainDisplay';
import Navbar from './Navbar';
import StatsContainer from './StatsContainer';
import { Route, Routes } from 'react-router-dom';

const MainContainer = () => {
  const [gameMode, setGameMode] = useState('mainPage');
  const [currentUser, setCurrentUser] = useState('');
  return (
    <div className='MainContainer'>
      <Routes>
        <Route
          path='/'
          element={
            <>
              <Navbar setGameMode={setGameMode} />
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
              <MainDisplay gameMode={gameMode} currentUser={currentUser}/>
              <StatsContainer />
            </>
          }
        ></Route>
        <Route
          path="/signUp"
          element={
            <>
              <Navbar />
              <MainDisplay gameMode={gameMode} />
              <StatsContainer />
            </>
          }
        ></Route>
        <Route
          path="/login"
          element={
            <>
              <Navbar />
              <MainDisplay gameMode={gameMode} setCurrentUser={setCurrentUser} setGameMode={setGameMode} />
              <StatsContainer />
            </>
          }
        ></Route>
      </Routes>
    </div>
  );
};

export default MainContainer;
