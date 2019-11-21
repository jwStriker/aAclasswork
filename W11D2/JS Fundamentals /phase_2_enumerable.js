const NUMS = [1,2,3,4,5,6,7,8,9];

Array.prototype.myEach = function(func){
  for (let i = 0; i < this.length; i++) {
      func(this[i]);
  }
};

// NUMS.myEach((something) => {
//     console.log(`the number is ${something}`);
// });

Array.prototype.myMap = function(func){
  const mappedArray = [];
  this.myEach(ele => mappedArray.push(func(ele)));
  return mappedArray;
};

// console.log(NUMS.myMap( num => num + 1 ));


Array.prototype.myReduce = function(func, initialValue){
  let array = this;
  
  if (initialValue === undefined) {
    initialValue = array[0];
    array = array.slice(1);
  }

  array.myEach(el => initialValue = func(initialValue, el));

  return initialValue;
};

// console.log(NUMS.myReduce( (something, somethingElse) => something + somethingElse));
