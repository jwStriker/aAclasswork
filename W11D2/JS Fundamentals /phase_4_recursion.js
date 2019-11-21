function range(start, end){
  if (start === end){
    return [];
  }
  let r = range(start, end - 1);
    r.push(end - 1);
  
return r;
} 
// console.log(`range(1,5) = ${range(1,5)}`);

function sumRec(arr) {
  if (arr.length === 0){
    return 0;
  }
  let last = arr[arr.length - 1];
  return sumRec(arr.slice(0, arr.length - 1)) + last;
};
// console.log(`sumRec([1,2,3]) = ${sumRec([1,2,3])}`);

function exponent1(base, exp){
  return exp === 0 ? 1 : (base * exponent1(base, exp - 1));
}
// console.log(`exponent1(2,3) = ${exponent1(2, 3)}`);

function exponent2(base, exp){
  if (exp === 0){
    return 1;
  }
  if(exp % 2 === 0){
    let subAnswer = exponent2(base, exp/2);
    return subAnswer * subAnswer
   } else {
     let subAnswer = exponent2(base, ((exp -1)/ 2 ));
     return subAnswer * subAnswer * base;
  }
}
// console.log(`exponent2(2,3) = ${exponent2(2,3)}`);

function fibonacci(n){
  if (n < 3){
    return [0,1].slice(0,n);
  }
  let arr = fibonacci(n-1);
  arr.push(arr[arr.length - 1] + arr[arr.length - 2]);
  return arr;
}
// console.log(`fibonacci(8) = ${fibonacci(8)}`);

function deepDup(arr){
  if(!(arr instanceof Array)){
    return arr;
  }
  return arr.map((el) => {
    return deepDup(el);
  });
}
// console.log(`deepDup[1[2,3[4,[5]]] = ${deepDup[1[2,3[4,[5]]]]}`);

function bSearch(arr, target){
  if(arr.length === 0){
    return -1;
  }

}