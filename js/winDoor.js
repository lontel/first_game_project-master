class WinDoor {

    constructor(ctx, canvasSize) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.doorPos = { x: this.canvasSize.w + 5, y: this.canvasSize.h * .8 }
        this.image = new Image();
        this.image.src = "./img/winDoorBannana.png"

        this.init()
    }

    init() {
        this.draw()
    }

    draw() {
        this.ctx.drawImage(this.image, this.doorPos.x, this.doorPos.y * .8, 200, 200)
        this.move()
    }
    
    move() {
        this.doorPos.x -= 1
    }
}