
Array.prototype.uniq = function() {
    let uniqArray = [];
    for (let i = 0; i < this.length; i++) {
        if (uniqArray.includes(this[i])) {
            continue;
        }
        uniqArray.push(this[i]);
    }
    return uniqArray;
};

Array.prototype.twoSum = function() {
    const pairs = [];

    for (let i = 0; i < this.length; i++) {
        for (let j = (i + 1); j < this.length; j++) {
            if (this[i] + this[j] === 0) {
                pairs.push([i,j]);
            }
        }
    }
    return pairs;
};

Array.prototype.transpose = function(){
    const cols = Array.from(
        { length: this[0].length },
        () => Array.from( {length: this.length} ) 
    );

    for ( let i = 0; i < this.length; i++ ) {
        for (let j = 0; j < this.length; j++) {
            cols[j][i] = this[i][j];
        }
    }
    return cols; 
};

// console.log([[1,2,3],[4,5,6],[7,8,9]].transpose());