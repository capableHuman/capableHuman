import React, { useEffect } from 'react';

const ReactionTimeGame = ({ gameStarted, setGameStarted }) => {
  const startGame = (e) => {
    e.preventDefault();
    setGameStarted(true);
  };

  const displayGreen = () => {
    returns (<button>
      {' '}
      <h2> it's green </h2>
    </button>
    )
  }


  
  // setTimeout(displayGreen, 3000);



  if (gameStarted === true) {
    
    return (
      <div>
        <button>
          <h1>Wait For Green</h1>
        </button>
      </div>
    );
  } else {
    return (
      <button onClick={startGame}>
        <h1>Reaction Time Game</h1>
        <p>
          Click to start! When red box turns green, click as fast as you can.
        </p>
      </button>
    );
  }
};

export default ReactionTimeGame;
