import { useState } from "react";
import axios from "axios";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function registerUser(e) {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8080/signup", {
        username: username,
        email: email,
        password: password,
      });

      console.log(res.data);

      alert("Registration Successful");
    } catch (err) {
      console.log(err);
      alert("Registration Failed");
    }
  }

  return (
    <div>
      <h2>Signup</h2>

      <input
        type="text"
        placeholder="Enter Username"
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />

      <br />
      <br />

      <input
        type="email"
        placeholder="Enter Email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />

      <br />
      <br />

      <input
        type="password"
        placeholder="Enter Password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />

      <br />
      <br />

      <button onClick={registerUser}>Signup</button>
    </div>
  );
}

export default Signup;
