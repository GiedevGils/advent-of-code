const fs = require('fs')
const readline = require('readline')

const input = readline.createInterface({ input: fs.createReadStream('./input.txt') })

const headPos = [0, 0]
const tailPos = [0, 0]

const tailPositions = new Set()

const moveTailIfRequired = () => {
  const [headY, headX] = headPos
  const [tailY, tailX] = tailPos
  const diffX = headX - tailX
  const diffY = headY - tailY

  if (headY === tailY && headX === tailX) return true // if in same spot
  if (headY === tailY && (diffX === -1 || diffX === 1)) return true // if only one location difference on X axis
  if (headX === tailX && (diffY === -1 || diffX === 1)) return true // if only one location difference on Y axis
  if ((diffX === -1 || diffX === 1) && (diffY === -1 || diffY === 1)) return true // if one spot away diagonally

  // calculate right move
  if (diffX === 2) { // if head = 2 right
    moveRight(tailPos)
    if (diffY === 1) moveUp(tailPos) // if head is down 1
    if (diffY === -1) moveDown(tailPos) // if head is up 1
  }
  if (diffX === -2) { // if head = 2 left
    moveLeft(tailPos)
    if (diffY === 1) moveUp(tailPos) // if head is down 1
    if (diffY === -1) moveDown(tailPos) // if head is up 1
  }
  if (diffY === 2) { // if head = 2 up
    moveUp(tailPos)
    if (diffX === 1) moveRight(tailPos) // if head right 1
    if (diffX === -1) moveLeft(tailPos) // if head right 1
  }
  if (diffY === -2) {
    moveDown(tailPos)
    if (diffX === 1) moveRight(tailPos) // if head right 1
    if (diffX === -1) moveLeft(tailPos) // if head right 1
  }

  tailPositions.add(tailPos.join('.'))
}

const moveDown = part => (part[0] -= 1)
const moveUp = part => (part[0] += 1)
const moveRight = part => (part[1] += 1)
const moveLeft = part => (part[1] -= 1)

input.on('line', line => {
  const [direction, amount] = line.split(' ')

  for (let i = 0; i < amount; i++) {
    if (direction === 'D') moveDown(headPos)
    if (direction === 'U') moveUp(headPos)
    if (direction === 'R') moveRight(headPos)
    if (direction === 'L') moveLeft(headPos)

    moveTailIfRequired()

    // console.log({ headPos, tailPos })
  }
})

input.on('close', () => {
  tailPositions.add('0.0')
  console.log('finished', { nr: tailPositions.size })
})
