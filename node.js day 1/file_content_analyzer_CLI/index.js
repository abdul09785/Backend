const fs = require("fs");


const filePath = process.argv[3];

const data = fs.readFileSync(filePath,"utf8");

function letterCount (){
    console.log("The number of letter in this file:",data.length);

}
function lineCount(){

    const lineCount = data.split("\n").length;

    console.log("The number of the letter in this file:",lineCount);

}


function wordCount(){
    const wordCount = data.split(' ').length;
    console.log("the number of words in this:",wordCount);
    }

if (process.argv[2] === "letter"){
    letterCount()
}else if (process.argv[2] === "line"){
    lineCount()
} else if(process.argv[2] === "word"){
    wordCount()
}else{
    console.log("Invalid argument");
}