const Game = {
    title: 'Iron Monkey',
    author: 'Marcos & Leon',
    license: undefined,
    version: '1.0.0',
    canvasDom: undefined,
    ctx: undefined,
    background: undefined,
    FPS: 60,
    audio: new Audio('./sounds/sound1.wav'),
    gameOverAudio: new Audio('./sounds/gameOver.wav'),
    winAudio: new Audio('./sounds/win.wav'),
    jumpAudio: new Audio('./sounds/jump.wav'),
    powerAudio: new Audio('./sounds/power.wav'),
    finalAudio: new Audio('./sounds/final.wav'),
    framesIndex: 0,
    winningScore: 20,
    enemyArr: [],
    powerUpArr: [],
    keys: {
        jump: 'ArrowUp',
        moveLeft: 'ArrowLeft',
        moveRight: 'ArrowRight',
        shot: 'Space',
        moveDown: 'ArrowDown',
    },

    canvasSize: {
        w: undefined,
        h: undefined
    },

    init(id) {
        this.canvasDom = document.querySelector(id)
        this.ctx = this.canvasDom.getContext('2d')
        this.setDimensions()
        this.setEventListeners()
        this.createAll()
        this.start()
        this.audio.play()
        this.createPoweUp()
    },

    setDimensions() {
        this.canvasSize.w = window.innerWidth
        this.canvasSize.h = window.innerHeight
        this.canvasDom.setAttribute('width', this.canvasSize.w)
        this.canvasDom.setAttribute('height', this.canvasSize.h)
    },

    gameOver() {
        clearInterval(this.intervalId)
        document.querySelector('#canvasID').classList.toggle("disabled")
        document.querySelector('#gameOver').classList.toggle("disabled")
        this.audio.pause()
        this.gameOverAudio.play()
    },

    clearAll() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
    },

    createEnemy() {
        this.enemyArr.push(new Enemy(this.ctx, this.canvasSize))
    },

    createPoweUp() {
        this.powerUpArr.push(new PowerUp(this.ctx, this.canvasSize))
    },

    createAll() {
        this.player = new Player(this.ctx, this.canvasSize)
        this.background = new Background(this.ctx, this.canvasSize)
    },

    drawAll() {
        this.background.draw()
        this.player.draw()
        this.enemyArr.forEach(enemy => enemy.draw())
        if (this.player.score === this.winningScore) { this.winDoor.draw() }
        this.powerUpArr.forEach(powerUp => powerUp.draw())
    },

    setEventListeners()
    {

        // =========================
        // KEYBOARD
        // =========================

        document.onkeydown = event =>
        {
            switch (event.code)
            {

                case this.keys.jump:
                    this.player.jump()
                    this.jumpAudio.play()
                    break

                case this.keys.moveLeft:
                    this.player.moveLeft()
                    break

                case this.keys.moveRight:
                    this.player.moveRight()
                    break

                case this.keys.shot:
                    this.player.shoot()
                    this.player.bulletSound.play()
                    break
            }
        }


        // =========================
        // MOBILE CONTROL
        // =========================

        const leftButton = document.querySelector('#mobile-left')
        const rightButton = document.querySelector('#mobile-right')
        const jumpButton = document.querySelector('#mobile-jump')
        const shootButton = document.querySelector('#mobile-shoot')


        // Starea butoanelor de mișcare
        let movingLeft = false
        let movingRight = false


        // -------------------------
        // LEFT
        // -------------------------

        leftButton.addEventListener('touchstart', event =>
        {
            event.preventDefault()
            movingLeft = true
        }, { passive: false })

        leftButton.addEventListener('touchend', event =>
        {
            event.preventDefault()
            movingLeft = false
        }, { passive: false })

        leftButton.addEventListener('touchcancel', event =>
        {
            movingLeft = false
        })


        // -------------------------
        // RIGHT
        // -------------------------

        rightButton.addEventListener('touchstart', event =>
        {
            event.preventDefault()
            movingRight = true
        }, { passive: false })

        rightButton.addEventListener('touchend', event =>
        {
            event.preventDefault()
            movingRight = false
        }, { passive: false })

        rightButton.addEventListener('touchcancel', event =>
        {
            movingRight = false
        })


        // -------------------------
        // JUMP
        // -------------------------

        jumpButton.addEventListener('touchstart', event =>
        {
            event.preventDefault()

            this.player.jump()
            this.jumpAudio.play()
        }, { passive: false })


        // -------------------------
        // SHOOT
        // -------------------------

        shootButton.addEventListener('touchstart', event =>
        {
            event.preventDefault()

            this.player.shoot()
            this.player.bulletSound.play()
        }, { passive: false })


        // =========================
        // GAME LOOP FOR MOVEMENT
        // =========================

        setInterval(() =>
        {

            if (movingLeft)
            {
                this.player.moveLeft()
            }

            if (movingRight)
            {
                this.player.moveRight()
            }

        }, 1000 / this.FPS)
    },

    start() {
        this.intervalId = setInterval(() => {
            this.framesIndex++
            this.clearAll()
            this.drawAll()
            this.checkPlayerCollision()
            this.checkEnemyCollision()
            this.checkPlayerEnemyCollision()
            this.checkPowerUpCollision()
            this.score()
            this.lifes()
            if (this.framesIndex % 300 === 0) {
                if (this.player.score < this.winningScore) {
                    this.createPoweUp()
                }
            }
            if (this.framesIndex % 150 === 0) {
                this.enemyArr.forEach(enemy => {
                    enemy.createBullet()
                })
            }
            if (this.framesIndex % 100 === 0) {
                if (this.player.score < this.winningScore) {
                    this.createEnemy()
                }
            }
            if (this.player.score === this.winningScore) {
                this.checkDoorCollision()
                this.audio.pause()
                this.winAudio.play()
            }
        }, 1000 / this.FPS)
    },

    checkPlayerCollision() {
        this.enemyArr.forEach(enemy => {
            enemy.enemyBullets.forEach((bullet, index, arr) => {
                if (bullet.bulletPos.x < this.player.playerPos.x + 69 &&
                    bullet.bulletPos.x + 25 > this.player.playerPos.x &&
                    bullet.bulletPos.y < this.player.playerPos.y + 100 &&
                    10 + bullet.bulletPos.y > this.player.playerPos.y) {
                    arr.splice(index, 1)

                    if (this.player.lives > 1) {
                        this.player.lives--
                    } else {
                        this.gameOver()
                    }

                }
            })
        })
    },

    checkEnemyCollision() {
        this.player.bullets.forEach((bulletEl, index, arrb) => {
            this.enemyArr.forEach((enemy, index, arr) => {
                if (bulletEl.playerBulletPos.x > enemy.enemyPos.x - 75 &&
                    bulletEl.playerBulletPos.x - 25 < enemy.enemyPos.x &&
                    bulletEl.playerBulletPos.y > enemy.enemyPos.y - 100 &&
                    10 - bulletEl.playerBulletPos.y < enemy.enemyPos.y) {
                    if(enemy.enemyLives > 1){
                        enemy.enemyLives--
                    }else{
                        arr.splice(index, 1)
                        this.player.score++
                    }
                    arrb.splice(index, 1)
                    if (this.player.score === this.winningScore) {
                        this.enemyArr = []
                        this.powerUpArr = []
                        this.winDoor = new WinDoor(this.ctx, this.canvasSize)
                    }
                }
            })
        })
    },

    checkDoorCollision() {
        if (this.winDoor.doorPos.x > this.player.playerPos.x - 75 &&
            this.winDoor.doorPos.x - 25 < this.player.playerPos.x &&
            this.winDoor.doorPos.y > this.player.playerPos.y - 100 &&
            10 - this.winDoor.doorPos.y < this.player.playerPos.y) {
            this.winning()
            this.winAudio.pause()
            this.finalAudio.play()

        }
    },

    checkPlayerEnemyCollision() {
        this.enemyArr.forEach((enemy, index, arr) => {
            if (enemy.enemyPos.x > this.player.playerPos.x - 75 &&
                enemy.enemyPos.x - 25 < this.player.playerPos.x &&
                enemy.enemyPos.y > this.player.playerPos.y - 100 &&
                10 - enemy.enemyPos.y < this.player.playerPos.y) {
                if (this.player.lives > 0) {
                    this.player.lives--
                    arr.splice(index, 1)
                } else {
                    this.gameOver()
                }
            }
        })
    },

    checkPowerUpCollision() {
        this.powerUpArr.forEach((powerUp, index, arr) => {
            if (powerUp.powerUpPos.x > this.player.playerPos.x - 75 &&
                powerUp.powerUpPos.x - 25 < this.player.playerPos.x &&
                powerUp.powerUpPos.y > this.player.playerPos.y - 100 &&
                10 - powerUp.powerUpPos.y < this.player.playerPos.y) {
                arr.splice(index, 1)
                this.player.lives++
                this.powerAudio.play()
            }
        })
    },

    winning() {
        clearInterval(this.intervalId)
        document.querySelector('#canvasID').classList.toggle("disabled")
        document.querySelector('#winner').classList.toggle("disabled")
    },

    score() {
        this.ctx.font = "30px Arial"
        this.ctx.fillText(`Score: ${this.num}`, 10, 50)
        this.num = this.player.score
    },

    lifes() {
        this.ctx.font = "30px Arial"
        this.ctx.fillText(`Lives: ${this.num2}`, 160, 50)
        this.num2 = this.player.lives
    }

}