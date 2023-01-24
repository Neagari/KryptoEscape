const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

const bgImg = new Image()
bgImg.src = '../images/bgcanvas.png'

const superImg = new Image()
superImg.src = '../images/Character.png'

const kryptoImg = new Image()
kryptoImg.src = '../images/Kryptonite.png'

const bitcoinImg = new Image()
bitcoinImg.src = '../images/Bitcoin.png'

const finalScreenImg = new Image()
finalScreenImg.src = '../images/Final screen elements.png'

const superWidth = 90
const superHeight = 114

let isMovingLeft = false
let isMovingRight = false

const superY = canvas.height - superHeight - 100
let superX = canvas.width /2 - superWidth /2

let animateId
let gameOver = false

let score = 0

let audio = new Audio ("../Images/return_of_the_champions.mp3")


let obstacles = []
let bitcoins = []

class Obstacle {
  constructor(xPos, yPos, width, height) {
    this.xPos = xPos
    this.yPos = yPos
    this.width = width
    this.height = height
  }

draw() {
    this.yPos += 9
    ctx.drawImage(kryptoImg, this.xPos, this.yPos, this.width, this.height)
    
  }

  checkCollision() {
    if (
      superX < this.xPos + this.width &&
      superX + superWidth > this.xPos &&
      superY < this.yPos + this.height &&
      superHeight + superY > this.yPos
    ) {
        endGame()
    }
  }
}

class Bitcoin {
    constructor(xPos, yPos, width, height) {
      this.xPos = xPos
      this.yPos = yPos
      this.width = width
      this.height = height
    }
  
  draw() {
      this.yPos += 7
      ctx.drawImage(bitcoinImg, this.xPos, this.yPos, this.width, this.height)
    }
    
  
    checkCollision(bitcoin) {
      if (
        superX < this.xPos + this.width &&
        superX + superWidth > this.xPos &&
        superY < this.yPos + this.height &&
        superHeight + superY > this.yPos
      ) {
          console.log("Score inicial",score)
        const index = bitcoins.indexOf(bitcoin)
        bitcoins.splice(index,1)
          score += 10
          console.log("Score final",score)
      }
    }
  }
const endGame = () => {
    console.log("gameOver")
    obstacles = []
    bitcoins = []
    gameOver = true
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(finalScreenImg, 0, 0, canvas.width, canvas.height)
    document.querySelector('.score').style.display = 'block'
    audio.pause()
    
    // mostrar o score
    //mostrar restart

    document.querySelector("start-button").style.display = "block"
    animate()
}
const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height)
  ctx.drawImage(superImg, superX, superY, superWidth, superHeight)

  obstacles.forEach(obstacle => {
    obstacle.checkCollision()
    obstacle.draw()
  })

  obstacles = obstacles.filter(obstacle => obstacle.yPos < canvas.height)

  bitcoins.forEach(bitcoin => {
    bitcoin.checkCollision(bitcoin)
    bitcoin.draw()
  })

  bitcoins = bitcoins.filter(bitcoin => bitcoin.yPos < canvas.height)

  if (isMovingLeft && superX > 10) {
    superX -= 7
  }
  if (isMovingRight && superX < canvas.width - 10 - superWidth) {
    superX += 7
  }

  if (animateId % 100 === 0) {
    obstacles.push(new Obstacle(canvas.width * Math.random(), -50, 30, 30))
    obstacles.push(new Obstacle(canvas.width * Math.random(), -50, 50, 50))
    obstacles.push(new Obstacle(canvas.width * Math.random(), -50, 60, 60))
    obstacles.push(new Obstacle(canvas.width * Math.random(), -50, 70, 70))
    obstacles.push(new Obstacle(canvas.width * Math.random(), -50, 80, 80))
    bitcoins.push(new Bitcoin(canvas.width * Math.random(), -50, 50, 50))
    bitcoins.push(new Bitcoin(canvas.width * Math.random(), -50, 50, 50))
    bitcoins.push(new Bitcoin(canvas.width * Math.random(), -50, 50, 50))
    bitcoins.push(new Bitcoin(canvas.width * Math.random(), -50, 50, 50))
  }

  if (gameOver) {
    cancelAnimationFrame(animateId)
  } else {
    animateId = requestAnimationFrame(animate)
  }  
}
 

const startGame = () => {
  document.querySelector('.game-intro').style.display = 'none'
  document.querySelector('.score').style.display = 'none'
  animate()
  audio.play()
}

window.addEventListener('load', () => {
    document.querySelector('.score').style.display = 'none'
  document.getElementById('start-button').onclick = () => {
    startGame()
  }

  document.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') {
      isMovingLeft = true
    }
    if (event.key === 'ArrowRight') {
      isMovingRight = true
    }
  })

  document.addEventListener('keyup', event => {
    if (event.key === 'ArrowLeft') {
      isMovingLeft = false
    }
    if (event.key === 'ArrowRight') {
      isMovingRight = false
    }
  })
})