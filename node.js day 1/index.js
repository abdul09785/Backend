// const path = require("path");
// console.log(__dirname);

// const fullPath = path.join(
//     __dirname,"/content.txt"
// );
// console.log(fullPath);


// const fs = require("fs");


// const filePath = process.argv[3];

// const data = fs.readFileSync(filePath,"utf8");

// function lettercount(){

//     console.log("the number of letters in this file:", data.length);

// }



const fs = require("fs");
const filePath = "./content.txt"
fs.writeFile(filePath, "Hello World", (err)=>{
    console.log("File written successfully!");
});