const path = require("path");
const express = require("express");
const app = express();
const port = 3001;

app.use(express.static(path.join(__dirname, "client", "build")));

app.get("/*", (req, res) => {
  res.set('Cache-Control', 'no-store');
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});
app.listen(port, () => console.log("Wat!"));
