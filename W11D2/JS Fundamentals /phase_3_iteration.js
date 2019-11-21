Array.prototype.myBubbleSort = function() {
  let sorted = false;

  while (!sorted) {
    sorted = true;

    for(let i = 0; i < (this.length - 1); i++){
      if(this[i] > this[i + 1]) {
        [this[i], this[i+1] = this[i+1], this[i]];
        sorted = false;
      }
    }
  } return this;
}

// console.log([3,2,1].myBubbleSort());

String.prototype.mySubstrings = function(){
  let subs = [];

  for( let start = 0; start < this.length; start++){
    for(let end = start + 1; end <= this.length; end++){
      subs.push(this.slice(start, end));
    }
  } return subs;
}
// console.log("Brody".mySubstrings());