import React, { useState } from 'react';

const StatsContainer = ({
  overallHighSpeedScore,
  highSpeedScore,
  currentSpeedScore,
}) => {
  return (
    
    <div>
      <h2>{overallHighSpeedScore}</h2>
      <h2>{highSpeedScore}</h2>
      <h2>{currentSpeedScore}</h2>
    </div>
  );
};

export default StatsContainer;
