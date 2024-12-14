const fs = require('fs')
const readline = require('readline')

const input = readline.createInterface({ input: fs.createReadStream('./input.txt') })

const robots = []

input.on('line', line => {
  const [pos, speed] = line.split(' ')

  const posParsed = pos.split('=')[1]
  const posLeftWall = Number(posParsed.split(',')[0])
  const posTopWall = Number(posParsed.split(',')[1])

  const speedParsed = speed.split('=')[1]
  const speedLeft = Number(speedParsed.split(',')[0])
  const speedTop = Number(speedParsed.split(',')[1])

  robots.push({
    // I deliberately turn these two around because in my head
    // the top wall is the y-axis and the left wall is the x-axis
    // because of how 2d arrays work
    posX: posTopWall,
    posY: posLeftWall,
    speedLeft,
    speedTop
  })
})

input.on('close', () => {
  console.time('total duration')
  console.timeLog('total duration', 'start')

  const nrOfSeconds = 100
  const sizeTall = 103
  const sizeWide = 101

  for (let i = 0; i < nrOfSeconds; i++) {
    for (let j = 0; j < robots.length; j++) {
      const robot = robots[j]

      const newPosX = robot.posX + robot.speedTop
      const newPosY = robot.posY + robot.speedLeft

      const x = (newPosX + sizeTall) % sizeTall
      const y = (newPosY + sizeWide) % sizeWide

      robot.posX = x
      robot.posY = y
    }
  }

  const splitHorizontal = Math.floor(sizeTall / 2)
  const splitVertical = Math.floor(sizeWide / 2)

  const q1 = robots.filter(r => r.posY < splitVertical && r.posX < splitHorizontal).length
  const q2 = robots.filter(r => r.posY > splitVertical && r.posX < splitHorizontal).length

  const q3 = robots.filter(r => r.posY < splitVertical && r.posX > splitHorizontal).length
  const q4 = robots.filter(r => r.posY > splitVertical && r.posX > splitHorizontal).length

  console.log({ result: q1 * q2 * q3 * q4 })

  console.timeEnd('total duration', 'end')
})
