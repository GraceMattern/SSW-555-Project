const express = require("express");
// const connect = require("connect");
const app = express();

// const http = require("http");

const path = __dirname + "/index.html";

app.use("/", async (req, res) => {
  try {
    res.sendFile(path);
  } catch (error) {
    console.log(error);
  }
});

app.listen(8080, () => {
  console.log("Server will be running on http://localhost:8080");
});
// http.createServer(app).listen(8080);
// console.log("Server will be running on http://localhost:8080");
