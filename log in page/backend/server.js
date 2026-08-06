const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();

const JWT_SECRET = "I love biryani";
let users = [];

app.use(express.json());
app.use(cors());

const authMiddleware = (req, res, next) => {
  const { token } = req.headers;
  const jwtPayLoad = jwt.verify(token, JWT_SECRET);

  if (jwtPayLoad == undefined) {
    res.json({
      msg: "invalid credentials / you are not allowed to access this data",
    });
  }

  req.transferData = jwtPayLoad
  next();
  
};

app.post("/signup", (req, res) => {
  const { username, password, email } = req.body;
  const newUserObj = {
    username,
    password,
    email,
  };

  users.push(newUserObj);
  console.log("current db status", users);

  res.json({
    msg: "User registered successfully",
    data: newUserObj,
  });
});

app.post("/signin", (req, res) => {
  // step 1: db lookup
  const { email, password } = req.body;

  const foundUser = users.find((userObj) => {
    if (userObj.email == email && userObj.password == password) {
      return true;
    }
  });

  if (foundUser == undefined) {
    res.json({
      msg: "invalid credentials",
    });
  } else {
    const token = jwt.sign({ username: foundUser.username }, JWT_SECRET);
    res.json({
      msg: "login successful",
      token: token,
    });
  }
});

app.use(authMiddleware)

app.get("/me", (req, res) => {

   const jwtPayLoad = req.transferData;

  // db call after successful token verification
  const verifiedUserData =  users.find((userObj)=>{
        if(userObj.username === jwtPayLoad.username){
            return true
        }
    })

  res.json({
    msg: "you are eligible to get data",
    data: verifiedUserData,
  });
});



app.listen("8080", () => {
  console.log("Server is listening at port 8080");
});