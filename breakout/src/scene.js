class Scene {
  constructor() {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.resize();
    this.init();
  }

  init() {
    const app = document.querySelector("#app");

    this.canvas.style.backgroundColor = "#fff";
    this.drawRect(
      this.canvas.width / 2 - 48,
      this.canvas.height - 20,
      96,
      8,
      "#000"
    );
    app.appendChild(this.canvas);
  }

  resize() {
    this.canvas.width = window.innerWidth / 1.5;
    this.canvas.height = window.innerHeight / 1.5;
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawPaddle(x, y, width, height, color = "black") {
    this.ctx.beginPath();
    this.ctx.rect(x, y, width, height);
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, width, height);
  }

  moveRect(x, y, width, height, dx, dy) {
    this.clear();
    this.drawRect(x + dx, y + dy, width, height);
  }
}

export default Scene;
