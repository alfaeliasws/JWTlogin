"use strict"

//add numbers here in testArray variable if you want to test other numbers
const array = [1,2,3,4,5,6,7,8,9,10]

function fizzBuzz(arrayArg){

const result = arrayArg.map(item => {

    //Fizz for every item that returns 1 if divided by 3
    if(item % 3 === 0 && item % 5 !== 0) return "Fizz"

    //Buzz for every item that returns 1 if divided by 5
    if(item % 5 === 0 && item % 3 !== 0) return "Buzz"

    //My improvisation to tackle if the numbers is able to be divided by 3 and 5
    //Uncomment when you want FizzBuzz as the result (will be executed in numbers like 15, 30, 45, ...)
    // if(item % 3 === 0 && item % 5 === 0) return "FizzBuzz"

    //returning original number when it doesn't fit the validation of fizz and buzz
    if(item % 3 !== 0 && item % 5 !== 0) return item
})

return result
}

//Uncomement if you want to see the result
// console.log(fizzBuzz(array))