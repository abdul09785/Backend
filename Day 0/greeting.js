// greet.js


const args = process.argv.slice(2);
const name = args[0] || "Guest";
const age = args[1];

 console.log(`Hello ${name}!`);
 if (age){
    console.log(`You are ${age} years old.`)
    const yearBorn = new Date().getFullYear() - parseInt(age);
    console.log(`You were born around ${yearBorn}.`)
 }


 const args = process.argv.slice(2);
 const 