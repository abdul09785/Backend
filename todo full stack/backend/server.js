const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());
app.use(cors());

const PORT = 8080;
const JWT_SECRET = "arigaatoo";

let data = [];
let todoArr = [];

// Signup 

app.post("/signup", (req, res) => {
  const { username, email, password } = req.body;

  const foundUser = data.find((user) => {
    return user.email === email;
  });

  if (foundUser) {
    return res.status(400).json({
      message: "User already exists",
    });
  }

  data.push({
    username,
    email,
    password,
  });

  res.json({
    message: "Signup successful",
  });
});

//Signin 

app.post("/signin", (req, res) => {
  const { email, password } = req.body;

  const foundUser = data.find((user) => {
    return user.email === email && user.password === password;
  });

  if (!foundUser) {
    return res.status(401).json({
      message: "Invalid email or password",
    });
  }

  const token = jwt.sign(
    {
      email: foundUser.email,
    },
    JWT_SECRET
  );

  res.json({
    message: "Login successful",
    token,
  });
});

// Middleware 

function auth(req, res, next) {
  const token = req.headers.token;

  if (!token) {
    return res.status(401).json({
      message: "Token not found",
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    req.email = decoded.email;

    next();
  } catch (err) {
    res.status(401).json({
      message: "Invalid token",
    });
  }
}

// Get Profile 
app.get("/me", auth, (req, res) => {
  const foundUser = data.find((user) => {
    return user.email === req.email;
  });

  res.json({
    data: foundUser,
  });
});

//Get Todos

app.get("/todo", auth, (req, res) => {
  const userTodos = todoArr.filter((todo) => {
    return todo.email === req.email;
  });

  res.json({
    data: userTodos,
  });
});

//Add Todo 

app.post("/todo", auth, (req, res) => {
  const { todo } = req.body;

  todoArr.push({
    email: req.email,
    todo: todo,
  });

  res.json({
    message: "Todo added successfully",
    data: todoArr,
  });
});

//Update Todo 

app.put("/todo", auth, (req, res) => {
  const { oldTodo, newTodo } = req.body;

  todoArr = todoArr.map((item) => {
    if (item.email === req.email && item.todo === oldTodo) {
      return {
        email: req.email,
        todo: newTodo,
      };
    }

    return item;
  });

  res.json({
    message: "Todo updated successfully",
    data: todoArr,
  });
});

//Delete Todo 

app.delete("/todo", auth, (req, res) => {
  const { todo } = req.body;

  todoArr = todoArr.filter((item) => {
    return !(item.email === req.email && item.todo === todo);
  });

  res.json({
    message: "Todo deleted successfully",
    data: todoArr,
  });
});



app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});