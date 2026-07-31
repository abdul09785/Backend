const express = require("express");
const cors = require("cors");
const restaurantsArr = require("./utils/mockData");

const app = express();

const PORT = 8080;

let counter = 0;

setInterval(() => {
  counter = 0;
}, 5000);

const rateLimiter = (req, res, next) => {
  if (counter < 5) {
    next();
  } else {
    res.json({
      mesg: "your limit is exceeds",
    });
  }
};
const requestCounter = (req, res, next) => {
  console.log("the number of Requests is", counter);
  counter++;
  next();
};

const addTimeStampMiddleWare = (req, res, next) => {
  const now = new Date();
  const time = now.toLocaleTimeString();
  req.timeStamps = time;
  next();
};

const requestLoggerMiddleware = (req, res, next) => {
  const now = new Date();

  const time = now.toLocaleString();

  console.log("---------New Request----------");
  console.log("Method is:", req.method);
  console.log("Route is:", req.url);
  console.log("Time is:", time);
  next();
};

app.use(express.json());
app.use(cors());
app.use(addTimeStampMiddleWare);
app.use(requestCounter);
app.use(requestLoggerMiddleware);
app.use(rateLimiter);

app.get("/menu/:id", (req, res) => {
  console.log("menu get request received successfully and this is response");
  const { id } = req.params;

  const desireMenu = restaurantsArr.filter((res) => {
    return id === res.id;
  });
  res.json({
    mesgReceivedAt: req.timeStamps,
    data: desireMenu,
  });
});

app.get("/restaurant", (req, res) => {
  res.json({ msg: "data received successfully" });
});

app.listen(PORT, () => {
  console.log("Server is listening at port:", PORT);
});
