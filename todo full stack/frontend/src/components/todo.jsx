import { useEffect, useState } from "react";
import axios from "axios";

function Todo() {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [profile, setProfile] = useState(null);

  async function fetchTodo() {
    const token = localStorage.getItem("token");

    const response = await axios.get("http://localhost:8080/todo", {
      headers: {
        token: token,
      },
    });

    setTodoList(response.data.data);
  }

  useEffect(() => {
    fetchTodo();
  }, []);

  async function addTodo() {
    const token = localStorage.getItem("token");

    await axios.post(
      "http://localhost:8080/todo",
      {
        todo: todo,
      },
      {
        headers: {
          token: token,
        },
      },
    );

    setTodo("");
    fetchTodo();
  }

  async function deleteTodo(todo) {
    const token = localStorage.getItem("token");

    await axios.delete("http://localhost:8080/todo", {
      headers: {
        token: token,
      },
      data: {
        todo: todo,
      },
    });

    fetchTodo();
  }

  async function editTodo(oldTodo) {
    const newTodo = prompt("Enter New Todo");

    if (!newTodo) {
      return;
    }

    const token = localStorage.getItem("token");

    await axios.put(
      "http://localhost:8080/todo",
      {
        oldTodo: oldTodo,
        newTodo: newTodo,
      },
      {
        headers: {
          token: token,
        },
      },
    );

    fetchTodo();
  }

  async function getProfile() {
    const token = localStorage.getItem("token");

    const response = await axios.get("http://localhost:8080/me", {
      headers: {
        token: token,
      },
    });

    setProfile(response.data.data);
  }

  function logout() {
    localStorage.removeItem("token");
    window.location.reload();
  }

  return (
    <div className="todo-box todo-page">
      <h2 className="todo-title">Todo App</h2>

      <div className="todo-top">
        <button
          className="profile-btn"
          onClick={() => {
            getProfile();
          }}
        >
          Profile
        </button>

        <button
          className="logout-btn"
          onClick={() => {
            logout();
          }}
        >
          Logout
        </button>
      </div>

      {profile ? (
        <div className="profile-box">
          <h3 className="profile-title">Profile</h3>
          <p className="profile-text">Username: {profile.username}</p>
          <p className="profile-text">Email: {profile.email}</p>
          <hr className="profile-line" />
        </div>
      ) : null}

      <div className="todo-add-box">
        <input
          className="todo-input"
          type="text"
          placeholder="Enter Todo"
          value={todo}
          onChange={(e) => {
            setTodo(e.target.value);
          }}
        />

        <button
          className="todo-add-btn"
          onClick={() => {
            addTodo();
          }}
        >
          Add
        </button>
      </div>

      <div className="todo-list">
        {todoList.map((item, index) => {
          return (
            <div className="todo-item" key={index}>
              <h3 className="todo-item-title">{item.todo}</h3>

              <div className="todo-item-actions">
                <button
                  className="todo-edit-btn"
                  onClick={() => {
                    editTodo(item.todo);
                  }}
                >
                  Edit
                </button>

                <button
                  className="todo-delete-btn"
                  onClick={() => {
                    deleteTodo(item.todo);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Todo;
