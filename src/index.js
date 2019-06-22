import React from 'react';
import ReactDOM from 'react-dom';
import GameSetup from './TicTacToe/TicTacToe.js'
import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(
  <GameSetup />,
  document.getElementById('tic-tac-toe')
);

registerServiceWorker();
