function sum1() {
    let sum = 0;
    for (let i = 0; i < arguments.length; i++) {
        sum += arguments[i];
    }
    return sum;
}

function sum2(...nums) {
    let sum = 0;
    for (let i = 0; i < nums.length; i++) {
        sum += nums[i];
    }
    
}

//Binds with arguments:
Function.prototype.myBind = function(context){
    const fun = this;

    const bindArguments = Array.from(arguments).slice(1);
    return function _boundFunction() {
        const callArguments = Array.from(arguments);
        return fun.apply(context, bindArguments.concat(callArguments));
    };
};

Function.prototype.myBind1 = function (context, ...bindArgs) {
    return (...callArgs) => this.apply(context, bindArgs.concat(callArgs));
};

function curriedSum(numArgs){
    const nums = [];
    function _curriedSum(num){
        nums.push(num);

        if(nums.length === numArgs) {
            let sum = 0;
            nums.forEach((n) => {sum += n;});
            return sum;
        } 
        else{
            return _curriedSum;
        }
    }
    return _curriedSum;
}

Function.prototype.curry = function (numArgs) {
    const args = [];
    const fun = this;

    function _curriedFun(arg) {
        args.push(arg);

        if (args.length === numArgs) {
            // return fun(...args);
            return fun.apply(null, args); //Apply version
        } else {
            return _curriedFun;
        }
    }
    return _curriedFun;
}

// function sumThree(num1, num2, num3) {
//     return num1 + num2 + num3;
// }

// console.log(`sum is ${sumThree.curry(3)(5)(60)(15)}`); // 80


// class Cat {
//     constructor(name) {
//         this.name = name;
//     }

//     says(sound, person) {
//         console.log(`${this.name} says ${sound} to ${person}!`);
//         return true;
//     }
// }

// class Dog {
//     constructor(name) {
//         this.name = name;
//     }
// }

// const markov = new Cat("Markov");
// const pavlov = new Dog("Pavlov");

// markov.says("meow", "Ned");
// // Markov says meow to Ned!
// // true

// markov.says.myBind(pavlov, "meow", "Kush")();


// const sum = curriedSum(4);
// console.log(`sum is ${sum(5)(30)(20)(1)}`); // => 56