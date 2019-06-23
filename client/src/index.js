import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import GameSetup from "./TicTacToe/TicTacToe.js";
import Multitaskit from "./Multitaskit/Multitaskit.js";
import registerServiceWorker from "./registerServiceWorker";
import "./index.css";

const App = () => {
  return (
    <div>
      <h2>Hi, welcome to my site.</h2>
      <h3>Here you'll find my projects, blog, and what I like to do in my free time.</h3>
    </div>
  );
};

const AppRouter = () => {
  return (
    <Router>
      <nav>
        <ul>
          <h2>Kevin's Apps</h2>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/tic-tac-toe/">Tic-Tac-Toe</Link>
          </li>
          <li>
            <Link to="/multi/">Multitaskit</Link>
          </li>
        </ul>
      </nav>
      <div>
        <Route path="/" exact component={App} />
        <Route path="/tic-tac-toe/" component={GameSetup} />
        <Route path="/multi/" component={Multitaskit} />
      </div>
    </Router>
  );
};

ReactDOM.render(<AppRouter />, document.getElementById("root"));

registerServiceWorker();
