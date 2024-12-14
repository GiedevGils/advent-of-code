const fs = require('fs')
const path = require('path')
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

  const nrOfSeconds = 10000 // random high number to attempt to get it.
  const sizeTall = 103
  const sizeWide = 101

  for (let i = 0; i < nrOfSeconds; i++) {
    const areAllPositionsUnique = new Set(robots.map(r => `${r.posX},${r.posY}`)).size === robots.length

    if (areAllPositionsUnique) {
      // Create a grid
      const grid = Array.from({ length: sizeTall }, () => Array(sizeWide).fill('.'))

      // Place robots on the grid
      robots.forEach(robot => {
        grid[robot.posX][robot.posY] = '#'
      })

      // Convert grid to string
      const gridString = grid.map(row => row.join('')).join('\n')

      // Write grid to file
      fs.writeFileSync(path.join(__dirname, `grid_${i}.txt`), gridString)
    }

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

  console.timeEnd('total duration', 'end')
})
