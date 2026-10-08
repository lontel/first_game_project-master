class Player {

    constructor(ctx, canvasSize) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.base = this.canvasSize.h * .8
        this.playerPos = {
            x: this.canvasSize.w * .1,
            y: this.canvasSize.h * .8
        }
        this.playerSpeed = { x: 2, y: 1 }
        this.physics = { gravity: 0.4 }
        this.bullets = []
        this.lives = 3
        this.score = 0
        this.bulletSound = new Audio('./sounds/bullet.wav')
        this.image = new Image();
        this.image.src = './img/mono/monkey_run_1.png'

        this.init()
    }

    init() {
        this.draw()
    }

    draw() {
        this.ctx.drawImage(this.image, this.playerPos.x, this.playerPos.y, 75, 100)
        this.move()
        this.drawBullets()
    }

    drawBullets() {
        this.bullets.forEach(bullet => bullet.draw())
        this.clearBullets()
    }

    jump() {
        if (this.playerPos.y === this.base) {
            this.playerPos.y -= this.playerSpeed.y
            this.playerSpeed.y -= 8
        }
    }

    moveLeft() {
        this.playerPos.x -= 20
    }

    moveRight() {
        this.playerPos.x += 20
    }

    shoot() {
        this.bullets.push(new Bullet(this.ctx, this.playerPos, this.canvasSize))
    }

    move() {
        if (this.playerPos.y < this.base) {
            this.playerSpeed.y += this.physics.gravity / 3
            this.playerPos.y += this.playerSpeed.y
        }
        else {
            this.playerPos.y = this.base;
            this.playerSpeed.y = 1;
        }
    }

    clearBullets() {
        this.bullets = this.bullets.filter(bull => bull.playerBulletPos.x <= this.canvasSize.w)
    }
}
