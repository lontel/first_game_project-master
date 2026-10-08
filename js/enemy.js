class Enemy {

    constructor(ctx, canvasSize) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.enemyPos = { x: canvasSize.w * 0.9, y: 0 }
        this.physics = { gravity: 0.4 }
        this.enemyBullets = []
        this.enemySpeed = { x: 10, y: 1 }
        this.base = this.canvasSize.h * .8
        this.image = new Image()
        this.image.src = "./img/hunter.png"
        this.audio = new Audio('./sounds/spear.wav')
        this.enemyLives = 5

        this.init()
    }

    init() {
        this.draw()
    }

    draw() {
        this.ctx.drawImage(this.image, this.enemyPos.x, this.enemyPos.y , 100, 100);
        this.move()
        this.drawBullets()
    }

    drawBullets() {
        this.enemyBullets.forEach(bullet => bullet.drawBullet())
        this.clearBullets()
        this.audio.play()
    }

    move() {
        if (this.enemyPos.y <= this.base) {
            this.enemySpeed.y += this.physics.gravity / 3
            this.enemyPos.y += this.enemySpeed.y
        }
        else {
            this.enemyPos.y = this.base;
            this.enemyPos.x -= this.enemySpeed.x
            this.enemySpeed.y = 3;
            this.drawBullets()
        }
    }

    createBullet() {
        this.enemyBullets.push(new EnemyBullet(this.ctx, this.enemyPos, this.canvasSize))
    }

    clearBullets() {
        this.enemyBullets = this.enemyBullets.filter(bull => bull.bulletPos.x <= this.canvasSize.w)
    }
}
