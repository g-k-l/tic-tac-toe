import React from "react";
import "./Multitaskit.css";
import { getOAuthURL } from "./oauth.js";

const Multitaskit = () => {
  return (
    <div>
      <a href={getOAuthURL()}>Login with Reddit</a>
    </div>
  );
};

export default Multitaskit;