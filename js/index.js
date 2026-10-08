window.onload = () => {

    const button = document.querySelector('button')
    button.onclick = () => {
        Game.init('#canvasID')
        document.querySelector('.start').classList.toggle("disabled")
        document.querySelector('#canvasID').classList.toggle("disabled")
    }

    const tryButt = document.querySelector('#tryAgain')
    tryButt.onclick = () => {
        Game.init('#canvasID')
        document.querySelector('#gameOver').classList.toggle("disabled")
        document.querySelector('.start').classList.toggle("disabled")
        location.reload()
    }
    
    const winButt = document.querySelector('#winButt')
    winButt.onclick = () => {
        Game.init('#canvasID')
        document.querySelector('#winner').classList.toggle("disabled")
        document.querySelector('.start').classList.toggle("disabled")
        location.reload()
    }
}
