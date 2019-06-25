import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import GameSetup from "./TicTacToe/TicTacToe.js";
import Multitaskit from "./Multitaskit/Multitaskit.js";
import registerServiceWorker from "./registerServiceWorker";
import "./index.css";

const App = () => {
  return (
    <div>
      <h3>Hi, welcome to my site.</h3>
      <h4>
        Here you'll find my projects, blog, and what I like to do in my free
        time.
      </h4>
    </div>
  );
};

const About = () => {
  return (
    <div>
      <h3>[Under Construction]</h3>
    </div>
  );
};

const NotFound = () => {
  return (
    <div>
      <h3>Oops, not found!</h3>
    </div>
  );
};

const AppRouter = () => {
  return (
    <Router>
      <nav>
        <div id="nav1">
          <h2>
            <Link to="/">Kevin's Apps</Link>
          </h2>
        </div>
        <ul>
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
      <div className="content">
        <Switch>
          <Route path="/" exact component={App} />
          <Route path="/about/" exact component={About} />
          <Route path="/tic-tac-toe/" component={GameSetup} />
          <Route path="/multi/" component={Multitaskit} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
};

ReactDOM.render(<AppRouter />, document.getElementById("root"));

registerServiceWorker();
