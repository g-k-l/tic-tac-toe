const path = require("path");
const express = require("express");
const app = express();
require("dotenv").config()

const PORT = process.env.SERVER_PORT | 3001;
const REDDIT_SECRET = process.env.REDDIT_SECRET;


APIRouter = express.Router();

// API-related routes
APIRouter.route("/test")
  .get((req, res) => {
    res.send("Hello, API");
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
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});
app.use(FallthroughRouter);


app.listen(PORT, () => console.log("Server is running..."));
