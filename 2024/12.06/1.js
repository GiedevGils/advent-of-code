const fs = require('fs')
const readline = require('readline')
const { makeGridTraverser } = require('../../lib/js')
const { findCursor, getNextDirection } = require('./lib')

const input = readline.createInterface({ input: fs.createReadStream('./input.txt') })

/** @type {Array<Array<any>>} */
const grid = []

input.on('line', line => {
  grid.push(line.split(''))
})

input.on('close', () => {
  console.time()

  const visitedPositions = new Set()

  const { getSingle } = makeGridTraverser(grid)
  let { posX, posY } = findCursor(grid)

  let direction = 'above'

  while (direction) {
    visitedPositions.add(`${posX},${posY}`)

    const { newIdxX, newIdxY, value } = getSingle(direction)(posX, posY)

    if (!value) direction = null

    if (value === '#') {
      direction = getNextDirection(direction)
    } else {
      posX = newIdxX
      posY = newIdxY
    }
  }

  console.timeEnd()

  // 4753 too low
  console.log({
    size: visitedPositions.size
  })
})
