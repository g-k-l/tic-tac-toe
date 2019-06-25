import React from "react";
import "./Multitaskit.css";
import { getOAuthURL, getSubreddits } from "./utils.js";


class Multitaskit extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <a href={getOAuthURL()}>Login with Reddit</a>
        <div id="multigrid">
          <div id="item-1">something</div>    
        </div>
      </div>
    );
  }
};

export default Multitaskit;