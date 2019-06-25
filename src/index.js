import React from "react";
import ReactDOM from "react-dom";
import GameSetup from "./TicTacToe.js";
import registerServiceWorker from "./registerServiceWorker";
import "./index.css";


ReactDOM.render(<GameSetup />, document.getElementById("root"));

registerServiceWorker();
