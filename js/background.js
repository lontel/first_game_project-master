class Background {

    constructor(ctx, canvasSize) {
        this.ctx = ctx;
        this.canvasSize = canvasSize
        this.backgroundPos = { x: this.canvasSize.w , y: this.canvasSize.h}
        this.image = new Image()
        this.image.src = "./img/jungleBackground.png"
        this.posX = 0
        this.posY = 0
        this.velX = 1;

        this.init()
    }

    init(){
        this.draw()
    }

    draw() {
        this.ctx.drawImage(this.image, this.posX, this.posY, this.backgroundPos.x, this.backgroundPos.y);
        this.ctx.drawImage(this.image, this.posX + this.canvasSize.w, this.posY, this.canvasSize.w, this.canvasSize.h);
        this.move()
    }

    move() {
        if (this.posX <= -this.canvasSize.w) {
            this.posX = 0;
        }
        this.posX -= this.velX;
    }
}
