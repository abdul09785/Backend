const express = require("express");

const app = express();

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  if (token === "my-secret-token") {
    next();
  } else {
    res.status(402).json({
      message: "unauthorized",
    });
  }
};

app.use(authMiddleware);

app.get("/profile", (req, res) => {
  res.json({
    name: "alex",
    balance: 5000,
  });
});

app.listen("8080", () => {
  console.log("Server running");
});
