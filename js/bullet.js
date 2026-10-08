class Bullet {

    constructor(ctx, playerPos, canvasSize) {
        this.ctx = ctx
        this.playerBulletPos = { x: playerPos.x, y: playerPos.y }
        this.canvasSize = canvasSize
        this.bulletSpeed = { x: 10, y: 1 }
        this.image = new Image();
        this.image.src = "./img/bannana_bullet.png";
    }

    draw() {
        this.ctx.drawImage(this.image, this.playerBulletPos.x + 75, this.playerBulletPos.y + 30, 30, 30);
        this.move()
    }

    move() {
        this.playerBulletPos.x += this.bulletSpeed.x
    }
}