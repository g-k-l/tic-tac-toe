import queryString from "query-string";


export function getOAuthURL() {
  const CLIENT_ID = "pWBV-APLhRHm-A";
  const OAUTH_URL = "https://www.reddit.com/api/v1/authorize";
  // TODO: update this
  const SITE_URL = "https://react-fun-tic-tac-toe.herokuapp.com/";

  const payload = {
    client_id: CLIENT_ID,
    response_type: "code",
    state: window.crypto.getRandomValues(new Uint32Array(1))[0],
    redirect_uri: SITE_URL,
    duration: "temporary",
    scope: ["identity", "mysubreddits"]
  };
  return OAUTH_URL + "?" + queryString.stringify(payload);
}
