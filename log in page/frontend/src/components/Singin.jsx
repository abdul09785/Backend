import { useState } from "react";
import axios from "axios";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function loginUser(e) {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8080/signin", {
        email: email,
        password: password,
      });

      console.log(res.data);

      localStorage.setItem("token", res.data.token);

      alert("Login Successful");
    } catch (err) {
      console.log(err);
      alert("Login Failed");
    }
  }

  return (
    <div>
      <h2>Sign In</h2>

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

      <button onClick={loginUser}>Login</button>
    </div>
  );
}

export default Signin;