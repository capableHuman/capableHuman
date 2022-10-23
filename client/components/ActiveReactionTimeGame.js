// import React, { useEffect, useState, useTimer } from 'react';

// const ActiveReactionTimeGame = ({ gameStarted, setGameStarted }) => {
//   let timer;
//   let clickSpeed = 0;
//   const styles = {
//     width: '100%',
//     height: '100%',
//   };

//   function format(value, scale, modulo, padding) {
//     value = Math.floor(value / scale) % modulo;
//     return value;
//   }



//   const getClickSpeed = (e) => {
//     e.preventDefault();
//     console.log(timer);
//     console.log(clickSpeed);
//     clearInterval(timer);

//   };

 
//   const toggleClickableAndStartTimer = () => {
//     toggleClickable();
//     startTimer();
//   };

//   useEffect(() => {
//     const setCountDown = Math.random() * 3 * 1000;
//     setTimeout(toggleClickableAndStartTimer, setCountDown);
//   }, []);

//   return (
//     <>
//       {clickable ? (
//         <button style={styles} onClick={getClickSpeed}>
//           Click!
//         </button>
//       ) : (

//       )}
//     </>
//   );
// };

// export default ActiveReactionTimeGame;
