const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "arigaatoo";
const app = express();

app.use(express.json());
app.use(cors());
const PORT = 8080;
let data = [];
app.post("/singup", (req, res) => {
  const { username, email, password } = req.body;
  const userData = {
    username,
    email,
    password,
  };
  data.push(userData);
  console.log(userData);
  res.status(200).json({
    msg: " singup successfully",
    data: userData,
  });
});

app.post("/singin", (req, res) => {
  const { email, password } = req.body;

  const foundUser = data.find(
    (userData) => userData.email === email && userData.password === password,
  );

  if (foundUser == undefined) {
    res.json({
      msg: "Invalid credentials",
    });
  }

  const token = jwt.sign({ username: foundUser.username }, JWT_SECRET);

  res.json({
    msg: "Login successfully",
    data: token,
  });
});

app.get("/me", (req, res) => {
  const { token } = req.headers;
  const jwtPayLoad = jwt.verify(token, JWT_SECRET);
  if (jwtPayLoad === undefined) {
    res.json({
      mesg: "invalid credential and not allow to access your data",
    });
  }

  const verifiedAccount = data.find((userData) => {
    if (userData.username == jwtPayLoad.username) { 
      return true;
    }
  });
  res.json({
    msg: "verified and can access the data",
    data: verifiedAccount,
  });
});

app.listen(PORT, () => {
  console.log("Server is running at port:", PORT);
});
