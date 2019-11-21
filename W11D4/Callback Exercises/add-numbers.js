// const readline = require("readline");

// const reader = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

function addNumbers(sum, numsLeft, completionCallback){
    if (numsLeft >0){
        reader.question("enter a num: ", function (numStr){
            const inputNum = parseInt(numStr);

            sum += inputNum;
            console.log("temp sum: "+ sum);

            addNumbers(sum, numsLeft - 1, completionCallback);
        });
    } else {
        completionCallback(sum);
    }
}

// addNumbers(0, 3, sum => console.log(`Total Sum: ${sum}`));