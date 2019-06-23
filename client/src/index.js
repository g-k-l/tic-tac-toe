import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import GameSetup from "./TicTacToe/TicTacToe.js";
import Multitaskit from "./Multitaskit/Multitaskit.js";
import registerServiceWorker from "./registerServiceWorker";


const App = () => {
  return <h2>Kevin's Apps</h2>;
};

const AppRouter = () => {
  return (
    <Router>
      <div>
        <Route path="/tic-tac-toe/" component={GameSetup} />
        <Route path="/multitaskit/" component={Multitaskit} />
      </div>
    </Router>
  );
};

ReactDOM.render(<AppRouter />, document.getElementById("root"));

registerServiceWorker();
