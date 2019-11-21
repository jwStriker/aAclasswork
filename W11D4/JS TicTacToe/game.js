const Board = require("./board");

class Game {
    constructor() {
        this.board = new Board();
        this.currentPlayer = Board.marks[0];
    }

    run(reader, completionCallback){
        this.getMove(reader, move => {
                try {
                    this.playMove(move);
                } catch (e) {
                    throw e;
                }

            if (this.board.isOver()) {
                this.board.print();
                if (this.board.winner()) {
                    console.log(`${this.board.winner()} wins!`);
                } else {
                    console.log("It's a TIE");
                }
                completionCallback();
            } else {
                this.run(reader, completionCallback);
            }
        });
    }

    playMove(pos) {
        this.board.placeMark(pos,this.currentPlayer);
        this.nextTurn();
    }

    nextTurn() {
        if (this.currentPlayer === Board.marks[0]) {
            this.currentPlayer = Board.marks[1];
        } else {
            this.currentPlayer = Board.marks[0];
        }
    }

    getMove(reader, callback) {
        const game = this;

        this.board.print();
        console.log(`Your move: ${this.currentPlayer}`);

        reader.question('Enter rowIdx between 0-2: ', rowIdxString => {
            const rowIdx = parseInt(rowIdxString);
            reader.question('Enter colIdx between 0-2: ', colIdxString => {
                const colIdx = parseInt(colIdxString);
                callback([rowIdx, colIdx]);
            });
        });
    }
}

module.exports = Game;