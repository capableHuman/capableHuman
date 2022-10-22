import React, { useState } from 'react';
import MainDisplay from './MainDisplay';
import Navbar from './Navbar';
import StatsContainer from './StatsContainer';
const MainContainer = () => {
  return (
    <div className="MainContainer">
      <Navbar />
      <MainDisplay />
      <StatsContainer />
    </div>
  );
};

export default MainContainer;
