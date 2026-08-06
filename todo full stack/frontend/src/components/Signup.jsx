import { useState } from "react";
import axios from "axios";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function registerUser() {
    try {
      const res = await axios.post("http://localhost:8080/signup", {
        username: username,
        email: email,
        password: password,
      });

      console.log(res.data);

      alert("Signup Successful");

      setUsername("");
      setEmail("");
      setPassword("");
    } catch (err) {
      console.log(err);

      alert("Signup Failed");
    }
  }

  return (
    <div className="signup-page">
      <h2 className="signup-title">Signup</h2>

      <input
        className="signup-input"
        type="text"
        placeholder="Enter Username"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />

      <br />
      <br />

      <input
        className="signup-input"
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />

      <br />
      <br />

      <input
        className="signup-input"
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />

      <br />
      <br />

      <button
        className="signup-button"
        onClick={() => {
          registerUser();
        }}
      >
        Signup
      </button>
    </div>
  );
}

export default Signup;
