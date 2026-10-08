class EnemyBullet {

    constructor(ctx, enemyPos, canvasSize) {
        this.ctx = ctx
        this.bulletPos = { x: enemyPos.x, y: enemyPos.y }
        this.enemyBulletSpeed = { x: 5, y: 1 }
        this.canvasSize = canvasSize
        this.image = new Image()
        this.image.src = "./img/denada.png"
    }

    drawBullet() {
        this.ctx.drawImage(this.image, this.bulletPos.x + 75, this.bulletPos.y + 25, 50, 20);
        this.move()
    }
    
    move() {
        this.bulletPos.x -= this.enemyBulletSpeed.x
    }
}