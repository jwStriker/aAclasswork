const CONSTANTS = {
  PIPE_SPACING: 220,
  GAP_HEIGHT: 150,
  PIPE_WIDTH: 50,
  EDGE_BUFFER: 50
}

export default class Level {
  constructor(dimensions) {
    this.dimensions = dimensions;

    const firstPipe = this.dimensions.width + 100;

    this.pipes = [
      this.newPipe(firstPipe),
      this.newPipe(firstPipe + CONSTANTS.PIPE_SPACING),
      this.newPipe(firstPipe + (2 * CONSTANTS.PIPE_SPACING))
    ];
  }

  newPipe(x) {
    const heightRange = this.dimensions.height - (2 * CONSTANTS.EDGE_BUFFER) - CONSTANTS.GAP_HEIGHT;
    const gapTop = (Math.random() * heightRange) + CONSTANTS.EDGE_BUFFER;
    const pipe = {
      topPipe: {
        left: x,
        right: CONSTANTS.PIPE_WIDTH + x,
        top: 0,
        bottom: gapTop
      },
        bottomPipe: {
          left: x,
          right: CONSTANTS.PIPE_WIDTH + x,
          top: gapTop + CONSTANTS.GAP_HEIGHT,
          bottom: this.dimensions.height
      }
    };
    return pipe;
  }

  movePipes(ctx){
    this.eachPipe(function(pipe) {
      pipe.topPipe.left -= 2;
      pipe.topPipe.right -= 2;
      pipe.bottomPipe.left -= 2;
      pipe.bottomPipe.right -= 2;
    });

    if (this.pipes[0].topPipe.right <= 0) {
      this.pipes.shift();
      const newX = this.pipes[1].topPipe.left + CONSTANTS.PIPE_SPACING;
      this.pipes.push(this.newPipe(newX));
    }
  }

  drawPipes(ctx){
    this.eachPipe(function(pipe) {
      ctx.fillStyle = "green";

      ctx.fillRect(
        pipe.topPipe.left,
        pipe.topPipe.top,
        CONSTANTS.PIPE_WIDTH,
        pipe.topPipe.bottom - pipe.topPipe.top
      );

      ctx.fillRect(
        pipe.bottomPipe.left,
        pipe.bottomPipe.top,
        CONSTANTS.PIPE_WIDTH,
        pipe.bottomPipe.bottom - pipe.bottomPipe.top
      );
    });
  }

  eachPipe(callback){
    this.pipes.forEach(callback.bind(this));
  }


  drawBackground(ctx) {
    ctx.fillStyle = "skyblue";
    ctx.fillRect(0, 0, this.dimensions.width, this.dimensions.height);
  }

  animate(ctx){
    this.drawBackground(ctx);
    this.movePipes();
    this.drawPipes(ctx);
  }


}