"use strict"

const array = [1,2,3,2,5,4,4,5,9,8]

function isDuplicate(arrayArgs){

    //storing data to know how many duplicates each number have
    let count = {}

    for(let i = 0; i < arrayArgs.length; i++){
        //collecting data in object count of how many duplicates each number have
        if(!count[arrayArgs[i]]) { count[arrayArgs[i]] = 1}
        else if(count[arrayArgs[i]]) { count[arrayArgs[i]] += 1}
    }

    //seeing the object count values and filter it with more then 1 data duplicate and then measure the array length
    let countDuplicate = Object.values(count).filter(v => v > 1).length

    //use template literals to see the data
    return `${countDuplicate} data duplicate`

}

//Uncomment to test
// console.log(isDuplicate(array))