class Game {
  constructor() {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.score = 0;
    this.ROW = 9;
    this.COLUMN = 7;
    this.DELAY = 500;

    this.init();
    this.createBricks();
    this.bindEvents();
    this.start();
  }

  init() {
    this.ball = {
      x: this.canvas.width / 2,
      y: this.canvas.height / 2,
      size: 10,
      speed: 4,
      dx: 4,
      dy: -4,
      visible: true,
    };

    this.paddle = {
      x: this.canvas.width / 2 - 40,
      y: this.canvas.height - 20,
      w: 80,
      h: 10,
      speed: 8,
      dx: 0,
      visible: true,
    };

    this.brickInfo = {
      w: 70,
      h: 20,
      padding: 10,
      offsetX: 45,
      offsetY: 60,
      visible: true,
    };
  }

  createBricks() {
    this.bricks = [];
    for (let i = 0; i < this.ROW; i++) {
      this.bricks[i] = [];
      for (let j = 0; j < this.COLUMN; j++) {
        const x =
          i * (this.brickInfo.w + this.brickInfo.padding) +
          this.brickInfo.offsetX;
        const y =
          j * (this.brickInfo.h + this.brickInfo.padding) +
          this.brickInfo.offsetY;
        this.bricks[i][j] = { x, y, ...this.brickInfo };
      }
    }
  }

  drawBall() {
    this.ctx.beginPath();
    this.ctx.arc(this.ball.x, this.ball.y, this.ball.size, 0, Math.PI * 2);
    this.ctx.fillStyle = this.ball.visible ? "#0095dd" : "transparent";
    this.ctx.fill();
    this.ctx.closePath();
  }

  drawPaddle() {
    this.ctx.beginPath();
    this.ctx.rect(this.paddle.x, this.paddle.y, this.paddle.w, this.paddle.h);
    this.ctx.fillStyle = this.paddle.visible ? "#0095dd" : "transparent";
    this.ctx.fill();
    this.ctx.closePath();
  }

  drawScore() {
    this.ctx.font = "20px Arial";
    this.ctx.fillStyle = "#0095dd";
    this.ctx.fillText(`Score: ${this.score}`, this.canvas.width - 100, 30);
  }

  drawBricks() {
    this.bricks.forEach((column) => {
      column.forEach((brick) => {
        this.ctx.beginPath();
        this.ctx.rect(brick.x, brick.y, brick.w, brick.h);
        this.ctx.fillStyle = brick.visible ? "#0095dd" : "transparent";
        this.ctx.fill();
        this.ctx.closePath();
      });
    });
  }

  movePaddle() {
    this.paddle.x += this.paddle.dx;

    // Wall detection
    if (this.paddle.x + this.paddle.w > this.canvas.width) {
      this.paddle.x = this.canvas.width - this.paddle.w;
    }

    if (this.paddle.x < 0) {
      this.paddle.x = 0;
    }
  }

  moveBall() {
    this.ball.x += this.ball.dx;
    this.ball.y += this.ball.dy;

    if (
      this.ball.x + this.ball.size > this.canvas.width ||
      this.ball.x - this.ball.size < 0
    ) {
      this.ball.dx *= -1;
    }

    if (
      this.ball.y + this.ball.size > this.canvas.height ||
      this.ball.y - this.ball.size < 0
    ) {
      this.ball.dy *= -1;
    }

    if (
      this.ball.x - this.ball.size > this.paddle.x &&
      this.ball.x + this.ball.size < this.paddle.x + this.paddle.w &&
      this.ball.y + this.ball.size > this.paddle.y
    ) {
      this.ball.dy = -this.ball.speed;
    }

    this.bricks.forEach((column) => {
      column.forEach((brick) => {
        if (brick.visible) {
          if (
            this.ball.x - this.ball.size > brick.x &&
            this.ball.x + this.ball.size < brick.x + brick.w &&
            this.ball.y + this.ball.size > brick.y &&
            this.ball.y - this.ball.size < brick.y + brick.h
          ) {
            this.ball.dy *= -1;
            brick.visible = false;
            this.increaseScore();
          }
        }
      });
    });

    if (this.ball.y + this.ball.size > this.canvas.height) {
      this.showAllBricks();
      this.score = 0;
    }
  }

  increaseScore() {
    this.score++;

    if (this.score % (this.ROW * this.COLUMN) === 0) {
      this.ball.visible = false;
      this.paddle.visible = false;

      setTimeout(() => {
        this.showAllBricks();
        this.score = 0;
        this.paddle.x = this.canvas.width / 2 - 40;
        this.paddle.y = this.canvas.height - 20;
        this.ball.x = this.canvas.width / 2;
        this.ball.y = this.canvas.height / 2;
        this.ball.visible = true;
        this.paddle.visible = true;
      }, this.delay);
    }
  }

  showAllBricks() {
    this.bricks.forEach((column) => {
      column.forEach((brick) => (brick.visible = true));
    });
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawBall();
    this.drawPaddle();
    this.drawScore();
    this.drawBricks();
  }

  update() {
    this.movePaddle();
    this.moveBall();
    this.draw();
    requestAnimationFrame(() => this.update());
  }

  start() {
    this.update();
  }

  bindEvents() {
    document.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "Right":
        case "ArrowRight":
          this.paddle.dx = this.paddle.speed;
          break;
        case "Left":
        case "ArrowLeft":
          this.paddle.dx = -this.paddle.speed;
          break;
        default:
          this.paddle.dx = 0;
          break;
      }
    });

    document.addEventListener("keyup", (e) => {
      switch (e.key) {
        case "Right":
        case "ArrowRight":
        case "Left":
        case "ArrowLeft":
          this.paddle.dx = 0;
          break;
        default:
          break;
      }
    });

    const rulesBtn = document.getElementById("rules-btn");
    const closeBtn = document.getElementById("close-btn");
    const rules = document.getElementById("rules");

    rulesBtn.addEventListener("click", () => rules.classList.add("show"));
    closeBtn.addEventListener("click", () => rules.classList.remove("show"));
  }
}

export default Game;
