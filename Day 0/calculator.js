// calculator

const args = process.argv.slice(2);
const num1 = parseFloat(args[0]);
const operation = args[1];
const num2 = parseFloat(args[2]);


let result ;
if(operation === '+'){
    result = num1 + num2;
} else if (operation === '-'){
    result = num1 - num2;
} else if (operation === '*'){
    result= num1 * num2;
} else if ( operation === '/'){
    result = num1/num2;
}else{
    console.log("Invalid Operation!");
    process.exit(1);
    console.log(process.exit(1))
}

console.log(`${num1}${operation}${num2} = ${result}`);