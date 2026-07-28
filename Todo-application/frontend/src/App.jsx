import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState();
  const [todoList, setTodoList] = useState();
  

async function submitFunc(){

}



  async function fetchTodo() {
    const response = await fetch("http://localhost:8080/todo");
    const todoData = await response.json();
    console.log(todoData);
    setTodoList(todoData.data);
  }

  useEffect(() => {
    fetchTodo();
  }, []);

  return (
    <div>
      <div>
        <h1>Your Todo list </h1>,
        <input
          type="text"
          placeholder={"Enter you todo"}
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        <button >submit</button> 
      </div>
    </div>
  );
}
export default App;
