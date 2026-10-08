class PowerUp {

    constructor(ctx, canvasSize) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.powerUpPos = { x: this.canvasSize.w + 5, y: this.canvasSize.h * .6 }
        this.image = new Image()
        this.image.src = "./img/coco.png"

        this.init()
    }

    init() {
        this.draw()
    }

    draw() {
        this.ctx.drawImage(this.image, this.powerUpPos.x, this.powerUpPos.y, 50, 50)
        this.move()
    }

    move() {
        if(this.powerUpPos.x < this.canvasSize.w / 2){
            this.powerUpPos.x -= 10
        }else{
            this.powerUpPos.x -= 3
        }
    }
}