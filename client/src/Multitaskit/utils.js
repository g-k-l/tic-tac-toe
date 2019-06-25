import queryString from "query-string";
import { SITE_URL } from "./constants.js";


export function getOAuthURL() {
  const CLIENT_ID = "pWBV-APLhRHm-A";
  const OAUTH_URL = "https://www.reddit.com/api/v1/authorize";
  const REDIRECT_URI = SITE_URL + "/api/v1/redditoauth";

  const payload = {
    client_id: CLIENT_ID,
    response_type: "code",
    // TODO: save state so that it could be compared
    // Note, this is not strictly necessary because the
    // the server 
    state: window.crypto.getRandomValues(new Uint32Array(1))[0],
    redirect_uri: REDIRECT_URI,
    duration: "temporary",
    scope: ["identity", "mysubreddits"]
  };
  return OAUTH_URL + "?" + queryString.stringify(payload);
}

export function getSubreddits(where, after, count) {
  const baseURL = "https://www.reddit.com";
  const endpoint = "/subreddits/mine/";

  const allowedWhere = ["subscriber", "constributor", "moderator", "streams"];
  if (allowedWhere.indexOf(where) < 0) {
    console.log("invalid 'where' given");
    return null;
  }
  const payload = {
    "after": after,
    "count": count,
    "limit": 100,
  };

  var nafter, ncount = after, count;
  const url = baseURL + endpoint + where
  return fetch(url, {
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload),
  })
}