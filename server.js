const path = require("path");
const queryString = require("query-string");
const crypto = require("crypto");
const express = require("express");
const app = express();
require("dotenv").config()

const PORT = process.env.SERVER_PORT | 3001;
const REDDIT_CLIENT_ID = "pWBV-APLhRHm-A";
const REDDIT_SECRET = process.env.REDDIT_SECRET;
const REDDIT_TOKEN_URL = "https://www.reddit.com/api/v1/access_token";


APIRouter = express.Router();

// API-related routes
APIRouter.route("/test")
  .get((req, res) => {
    res.send("Hello, API");
  });

APIRouter.route("/redditoauth")
  .get((req, res) => {
    // TODO: finish this thing
    // const state = crypto.randomBytes(64).toString();
    console.log(req.query);
    console.log("OAuth-ed!");
    // res.redirect(getOAuthURL(state));
    res.send('blah');
  });

app.use("/api/v1", APIRouter);


// for all non-API routes, serve the react app static
app.use(
  express.static(path.join(__dirname, "client", "build"), {
    fallthrough: false
  })
);

FallthroughRouter = express.Router()
FallthroughRouter.get("/*", (req, res) => {
  res.set("Cache-Control", "no-store");
  console.log("fallthrough");
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});
app.use(FallthroughRouter);


app.listen(PORT, () => console.log("Server is running..."));
