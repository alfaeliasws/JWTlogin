"use strict"

const array = ["kodok","kadal","radar","lincah"]

function isPalindrome(arrayArgs){

    const result = arrayArgs.map(item => {

        //split to make each word in array separated in an array then reversed it so we can check if it is a palindrome,
        //join it so the type will be the same when checked
        const reverse = item.split("").reverse().join("")

        //checking while returning if the revresed version of the word is the same as the original one
        return reverse === item
    })

    return result
}

//Uncomment to check
// console.log(isPalindrome(array));