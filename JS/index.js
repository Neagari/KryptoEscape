const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

const gameBoard = document.querySelector("#game-board")
const restartButton = document.querySelector(".gameOver")

const bgImg = new Image()
bgImg.src = './Images/bgcanvas.png'
bgImg.alt = "bgImg"

const superImg = new Image()
superImg.src = './Images/Character.png'
superImg.alt = "superImg"

const kryptoImg = new Image()
kryptoImg.src = './Images/Kryptonite.png'
kryptoImg.alt = "kryptoImg"

const bitcoinImg = new Image()
bitcoinImg.src = './Images/Bitcoin.png'
bitcoinImg.alt = "bitcoinImg"

const finalScreenImg = new Image()
finalScreenImg.src = './Images/Final screen elements.png'
finalScreenImg.alt = "finalScreenImg"

const audio = new Audio ("./Audio/return_of_the_champions.mp3")
audio.Volume = 0.1

const superWidth = 90
const superHeight = 114

let isMovingLeft = false
let isMovingRight = false

const superY = canvas.height - superHeight - 100
let superX = canvas.width /2 - superWidth /2

let animateId
let gameOver = false

let score = 0
let scoreElement = document.querySelector(".score")

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
    this.yPos += Math.floor(Math.random()* 10)
    ctx.drawImage(kryptoImg, this.xPos, this.yPos, this.width, this.height)
    }
    

  checkCollision(obstacle) {
    if (
      superX < this.xPos + this.width &&
      superX + superWidth > this.xPos &&
      superY < this.yPos + this.height &&
      superHeight + superY > this.yPos
    ) 
    {
        //check why didnt work
        const index = obstacles.indexOf(obstacle)
        obstacles.splice(index,1)
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
      this.yPos += Math.floor(Math.random()* 15)
      ctx.drawImage(bitcoinImg, this.xPos, this.yPos, this.width, this.height)
    }
    
    
  
    checkCollision(bitcoin) {
      if (
        superX < this.xPos + this.width &&
        superX + superWidth > this.xPos &&
        superY < this.yPos + this.height &&
        superHeight + superY > this.yPos
      ) {
        const index = bitcoins.indexOf(bitcoin)
        bitcoins.splice(index,1)
        score += 10
      }
    }
  }
const endGame = () => {
    gameOver = true
    obstacles.length = 0
    bitcoins.length = 0
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(finalScreenImg, 0, 0, canvas.width, canvas.height)
    scoreElement.innerText = `${score} Points`
    document.querySelector('.score').style.display = 'block'
    restartButton.style.display = "block"
    audio.pause()
   
}
    
const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height)
  ctx.drawImage(superImg, superX, superY, superWidth, superHeight)

  obstacles.forEach(obstacle => {
    obstacle.checkCollision(obstacle)
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
    setTimeout(()=>{
        obstacles.push(new Obstacle((canvas.width - 50) * Math.random(), -50, 50, 50))    
    },300)
    setTimeout(()=>{  
        bitcoins.push(new Bitcoin((canvas.width - 70) * Math.random(), -50, 70, 70))
    },500)
    setTimeout(()=>{   
        obstacles.push(new Obstacle((canvas.width - 70) * Math.random(), -50, 70, 70))
    },700)
    setTimeout(()=>{   
        bitcoins.push(new Bitcoin((canvas.width - 50) * Math.random(), -50, 50, 50))
    },900)
    setTimeout(()=>{
        obstacles.push(new Obstacle((canvas.width - 60) * Math.random(), -50, 60, 60))
    },1100)
    setTimeout(()=>{    
        bitcoins.push(new Bitcoin((canvas.width - 70) * Math.random(), -50, 70, 70))
    },1300)
    setTimeout(()=>{   
        obstacles.push(new Obstacle((canvas.width - 80) * Math.random(), -50, 80, 80))
    },1500)
    setTimeout(()=>{   
        bitcoins.push(new Bitcoin((canvas.width - 50) * Math.random(), -50, 50, 50)) 
    },1700)
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
    restartButton.style.display = "none"
    gameBoard.style.display = "none"
    document.getElementById('start-button').onclick = () => {
    gameBoard.style.display = "block"
    startGame()
    }

    document.getElementById('restartButton').addEventListener("click",() => {
        location.reload()
        })

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