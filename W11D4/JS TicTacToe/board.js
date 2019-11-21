class Board {
    constructor() {
        this.grid = Board.makeGrid();
    }

    
    isEmptyPos(pos){
        if(!Board.isValidPos(pos)) {
            throw new Error("Invalid position!");
        }
        return (this.grid[pos[0]][pos[1]] === null);
    } 

    

    placeMark(pos, mark) {
        if (!this.isEmptyPos(pos)){
            throw new Error('not empty!');
        }
        this.grid[pos[0]][pos[1]] = mark;
    }

    winner() {
        const winningSequences = [
            //horizontals
            [[0, 0], [0, 1], [0, 2]],
            [[1, 0], [1, 1], [1, 2]],
            [[2, 0], [2, 1], [2, 2]],
            //verticals
            [[0, 0], [1, 0], [2, 0]],
            [[0, 1], [1, 1], [2, 1]],
            [[0, 2], [1, 2], [2, 2]],
            //diagonals
            [[0, 0], [1, 1], [2, 2]],
            [[2, 0], [1, 1], [0, 2]]
        ];
        for (let i = 0; i < winningSequences.length; i++) {
            const winner = this.winnerHelper(winningSequences[i]);
                if (winner != null) {
                    return winner;
                }
        }
        return null;
    }

    winnerHelper(winningSequence) {
        for (let markIdx = 0; markIdx < Board.marks.length; markIdx++) {
            const target = Board.marks[markIdx];
            let winner = true;
            for (let posIdx = 0; posIdx < 3; posIdx++) {
                const pos = winningSequence[posIdx];
                const mark = this.grid[pos[0]][pos[1]];

                if (mark != target) {
                    winner = false;
                }   
            }
            if (winner) {
                return target;
            }
        }
        return null;
    }

    isOver() {
        if (this.winner() != null){
            return true;
        }
        for (let rowIdx = 0; rowIdx < 3; rowIdx++) {
            for (let colIdx = 0; colIdx < 3; colIdx++) {
                if (this.isEmptyPos([rowIdx, colIdx])){
                    return false;
                }
            }
        }
        return true;
    }
    

    print() {
        const whatever = [];
        for (let rowIdx = 0; rowIdx < 3; rowIdx++) {
            const marks = [];
            for (let colIdx = 0; colIdx < 3; colIdx++) {
                marks.push(
                    this.grid[rowIdx][colIdx] ? this.grid[rowIdx][colIdx] : " "
                );
            }
            whatever.push(`${marks.join('|')}\n`);
        }
        console.log(whatever.join('-----\n'));
    }

    static isValidPos(pos) {
        return (pos[0] >= 0) &&
        (pos[0] < 3) &&
        (pos[1] >= 0) &&
        (pos[1] < 3);
    }

    static makeGrid() {
        const grid = [];

        for (let i = 0; i < 3; i++) {
            grid.push([]);
            for (let j = 0; j < 3; j++) {
                grid[i].push(null);
            }
        }
        return grid;
    }   
}

Board.marks = ["X", "O"];

module.exports = Board;

// board = new Board
// board.print();
// board.placeMark([0,1],"O");
// board.placeMark([0,2], "X");
// board.placeMark([0,0], "X");
// board.placeMark([1, 1], "O");
// board.placeMark([1, 2], "X");
// board.placeMark([1, 0], "X");
// board.placeMark([2, 1], "X");
// board.placeMark([2, 2], "O");
// board.print();
// console.log("winner!", board.winner());
// console.log("game over:", board.isOver());
