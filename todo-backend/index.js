const express = require("express");

const app = express();

const PORT = 8080;

let todoArr = ["go to college"];

// This allows Express to read JSON from req.body
app.use(express.json());

app.get("/todo", (req, res) => {
  res.json({
    data: todoArr,
  });
});

//==========post===========
app.post("/todo", (req, res) => {
  console.log(req.body);

  const newTodo = req.body.todo;

  todoArr.push(newTodo);

  res.json({
    message: "Todo received and added successfully",
  });
});

//======put/patch todo=====
app.put("/todo", (req, res) => {
  const oldTodo = req.body.oldTodo;
  const newTodo = req.body.newTodo;

  todoArr = todoArr.map((todo) => {
    if (todo == oldTodo) {
      return todo;
    }
    return todoArr;
  });
  console.log(todoArr);
  res.json({
    message: "todo updated successfully",
    data: todoArr,
  });
});


//=======todo-delete========
app.delete("/todo",(req,res)=>{
 const {todo} = req.body;
  todoArr = todoArr.filter((Elem)=>{
    return Elem !== todo;
  });
  res.json({
    message: "todo deleted successfully",
    data: todoArr,
  });
}
);

app.listen(PORT, () => {
  console.log("Server is running at port", PORT);
});
