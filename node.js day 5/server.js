const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());

const user = [];

function generateToken() {
  let options = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
  ];

  let token = "";

  for (let i = 0; i < 32; i++) {
    token = token + options[Math.floor(Math.random() * options.length)];
  }
  return token;
}

app.post("/singup", (req, res) => {
  const { username, email, password } = req.body;
  const userObj = {
    username,
    email,
    password,
  };
  user.push(userObj);
  console.log(user);
  res.status(200).json({
    msg: "posted successfully",
  });
});

app.get("/singin", (req, res) => {
  const { email, password } = req.body;
  let foundUser = null;

  foundUser = user.find((user) => {
    if (user.email === email && user.password === password) {
      return true;
    }
  });

  if (foundUser) {
    const token = generateToken();
    foundUser.token = token;
    console.log("db checked", user);
    res.json({
      msg: "login succesfully",
      token: token,
    });
  } else {
    res.status(400).json({
      msg: "Invalid details",
    });
  }
});

app.listen("8080", () => {
  console.log("Server is running at port:", 8080);
});
