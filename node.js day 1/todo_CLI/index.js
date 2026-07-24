const fs = require("fs");
const path = require("path");
const { program } = require("commander");

//======Implementation of Todo cli application based on CRUD========

const filePath = path.join(__dirname, "todo.json");

//===========read operation ===============

const readTodo = () => {
  const data = fs.readFileSync(filePath, "utf8");
  console.log(data);
};

program
  .command("print")
  .description("display all todo from todo list")
  .action(() => {
    readTodo();
  });

//=============Create operation=================

const WriteTodo = (new_todo) => {
  const data = fs.readFileSync(filePath, "utf8");
  const parseTodo = JSON.parse(data);

  parseTodo.push(new_todo);

  fs.writeFileSync(filePath, JSON.stringify(parseTodo), "utf8");
  console.log("Todo written Successfully", 
    new_todo);
};

program
  .command("add")
  .description("add todo to todo list ")
  .argument("<newTodo>", "new todo list")
  .action((new_todo) => {
    WriteTodo(new_todo);
  });

//============ update operation===============

const updateTodo = (oldTodo, newTodo) => {
  const data = fs.readFileSync(filePath, "utf8");
  const parseTodo = JSON.parse(data);

  let deletedElemIndex = 0;

  const filteredTodo = parseTodo.filter((todo) => {
    if (todo.toLowerCase() == oldTodo.toLowerCase()) {
      return false;
    } else {
      return true;
    }
  });

  filteredTodo.splice(deletedElemIndex, 0, newTodo);

  fs.writeFileSync(filePath, JSON.stringify(filteredTodo), "utf8");
  console.log("Todo updated Successfully!", newTodo);
};

program
  .command("update")
  .description("deleted todo!")
  .argument("<oldTodo>", "todo to update")
  .argument("<newTodo>", "todo is updated")
  .action((oldTodo, newTodo) => {
    updateTodo(oldTodo, newTodo);
  });

//==============delete operation=============

const deleteTodo = (todo_value) => {
  const data = fs.readFileSync(filePath, "utf8");
  const parseTodo = JSON.parse(data);

  const filteredTodo = parseTodo.filter((todo) => {
    return todo.toLowerCase() !== todo_value.toLowerCase();
  });

  fs.writeFileSync(filePath, JSON.stringify(filteredTodo), "utf8");
  console.log("Todo deleted Successfully!", todo_value);
};

program
  .command("delete")
  .description("delete todo from from todo lit!")
  .argument("<todo_value", "todo to delete!")
  .action((todo_value) => {
    deleteTodo(todo_value);
  });

program
  .name("Todo_CLI")
  .description("CLI based on persistent todo application")
  .version("1.0.0");

program.parse();
