import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import GameSetup from './TicTacToe.js'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

ReactDOM.render(
  <GameSetup />,
  document.getElementById('tic-tac-toe')
);

registerServiceWorker();
