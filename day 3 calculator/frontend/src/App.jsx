import { useState } from "react";

import "./App.css";

function app() {
  const [answer, setAnswer] = useState("");
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");

  async function result(operation) {
    const res = await fetch(
      `http://localhost:8080/${operation}/${num1}/${num2}`,
    );
    const data = await res.json();
    setAnswer(data.result);
  }

  return (
    <div>
      <input
        className="num1"
        type="number"
        value={num1}
        placeholder="enter number"
        onChange={(e) => {
          setNum1(e.target.value);
        }}
      />
      <br />
      <input
        className="num2"
        type="number"
        value={num2}
        placeholder="enter number"
        onChange={(e) => {
          setNum2(e.target.value);
        }}
      />
      <br /> <br />
      <button
        onClick={() => {
          result("sum", num1, num2);
        }}
      >
        Sum
      </button>
      <button
        onClick={() => {
          result("mul", num1, num2);
        }}
      >
        Mul
      </button>
      <button
        onClick={() => {
          result("div", num1, num2);
        }}
      >
        Div
      </button>
      <h2>Result: {answer}</h2>
    </div>
  );
}

export default app;
