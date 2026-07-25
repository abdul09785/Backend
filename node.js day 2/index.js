const express = require("express");

//======app instance===========

const app = express();
const port = 8080;

//======method-route=========

let reqCount = 0;
app.get("/cards", (req, res) => {
  reqCount++;
  //   console.log(reqCount);
  console.log(`${reqCount} get req is received on /cards route`);
  res.send("your req has been received and this is your response.......!");
});

//=====app.get =============

app.listen(port, () => {
  console.log("Server is listening on port 8080");
});
