const express = require("express");

//=====instance=====

const app = express();
const PORT = 8080;

app.get("/sum/:a/:b", (req, res) => {
  let { a, b } = req.params;

  const result = parseInt(a) + parseInt(b);

  res.json({
    message: "calculated successfully",
    result: result,
  });
});

app.get("/mul/:a/:b", (req,res)=>{
  let {a,b} = req.params;
  const result = parseInt(a) * parseInt(b);

  res.json({
    message:"calculated successfully",
    result: result
  })
})



app.get("/div/:a/:b", (req,res)=>{
  const {a,b} = req.params;
  const result = parseInt(a) / parseInt(b);
  res.json({
    message: "calculated successfully",
    result: result
  })
})

app.listen(PORT, () => {
  console.log("Server is listening at port", PORT);
});
