import { useState } from "react";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Todo from "./components/Todo";
import "./App.css";

function App() {
  const [page, setPage] = useState("signup");

  const token = localStorage.getItem("token");

  if (token) {
    return <Todo />;
  }

  return (
    <div>
      <h1>Todo App</h1>

      {page === "signup" ? <Signup /> : <Signin />}

      <br />

      {page === "signup" ? (
        <button
          onClick={() => {
            setPage("signin");
          }}
        >
          Already have an account? Signin
        </button>
      ) : (
        <button
          onClick={() => {
            setPage("signup");
          }}
        >
          Create New Account
        </button>
      )}
    </div>
  );
}

export default App;