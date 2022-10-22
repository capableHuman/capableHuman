import React, { useState } from 'react';
import ReactionTimeButton from './ReactionTimeButton';
import VerbalMemory from './VerbalMemory';
const MainDisplay = () => {
  return (
    <div className="MainDisplay">
      <ReactionTimeButton />
      <VerbalMemory />
    </div>
  );
};

export default MainDisplay;
