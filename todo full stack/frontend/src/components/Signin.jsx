import { useState } from "react";
import axios from "axios";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function loginUser() {
    try {
      const res = await axios.post("http://localhost:8080/signin", {
        email: email,
        password: password,
      });

      console.log(res.data);

      localStorage.setItem("token", res.data.token);

      alert("Login Successful");

      window.location.reload();
    } catch (err) {
      console.log(err);

      alert("Login Failed");
    }
  }

  return (
    <div className="signin-page">
      <h2 className="signin-title">Signin</h2>

      <input
        className="signin-input"
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
        className="signin-input"
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
        className="signin-button"
        onClick={() => {
          loginUser();
        }}
      >
        Login
      </button>
    </div>
  );
}

export default Signin;
