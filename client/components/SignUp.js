import React, { useState } from 'react';

const SignUp = () => {
  const handleClick = (e) => {
    e.preventDefault();
    navigate('/signUp');
    setGameMode('signUp');
  };
  return (
    <div className="SignUp">
      <>SignUp Component</>
    </div>
  );
};

export default SignUp;
