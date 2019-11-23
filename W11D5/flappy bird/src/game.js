import Bird from "./bird";
import Level from "./level";

export default class FlappyBird {
  constructor(canvas){
    this.ctx = canvas.getContext("2d");
    this.dimensions = { width: canvas.width, height: canvas.height };
    this.registerEvents();
    this.restart();
  }

  play(){
    this.running = true;
    this.animate();
  }

  registerEvents(){
    this.clickHandler = this.click.bind(this);
    this.ctx.canvas.addEventListener("mousedown", this.clickHandler);
  }

  click(e) {
    if (!this.running) {
      this.play()
    }
    this.bird.flap();
  }

  restart() {
    this.running = false;
    this.bird = new Bird(this.dimensions);
    this.level = new Level(this.dimensions);

    this.animate();
  }

  animate() {
    this.level.animate(this.ctx);
    this.bird.animate(this.ctx);

    if (this.running) {
      requestAnimationFrame(this.animate.bind(this));
    }
  }

}