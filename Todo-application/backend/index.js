const express = require("express");

//==instance==
const app = express();

let todoArr = ["go to market"];
const PORT = 8080;

//===extract json from body and parse in original js object
app.use(express.json());

app.get("/todo", (req, res) => {
  res.json({
    data: todoArr,
  });
});

//====post======

app.post("/todo", (req, res) => {
  console.log(req.body);
  const { todo } = req.body;
  todoArr.push(todo);
  console.log(todoArr);

  res.json({
    message: "Todo added successfully",
  });
});

//====todo-put========

function updateTodo(oldTodo, newTodo) {
  let todoIndex;
  let filteredArray = todoArr.filter((todo, index) => {
    if (todo === oldTodo) {
      todoIndex = index;
      return false;
    } else {
      return true;
    }
  });
  filteredArray.splice(todoIndex, 0, newTodo);
  todoArr = filteredArray;
}

app.put("/todo", (req, res) => {
  const { oldTodo, newTodo } = req.body;
  updateTodo(oldTodo, newTodo);
  console.log(todoArr);

  res.json({
    message: "todo updated successfully",
  });
});

//======todo-delete===

app.delete("/todo", (req, res) => {
  const { todo } = req.body;
  todoArr = todoArr.filter((elem) => {
    if (elem == todo) {
      return false;
    } else {
      return true;
    }
  });

  res.json({
    message: "todo deleted successfully",
  });
});

app.listen(PORT, () => {
  console.log("Server is running at port", PORT);
});
