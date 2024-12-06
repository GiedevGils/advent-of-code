const fs = require('fs')
const readline = require('readline')
const R = require('ramda')
const { makeGridTraverser } = require('../../lib/js')
const { findCursor, getNextDirection } = require('./lib')

const input = readline.createInterface({ input: fs.createReadStream('./input.txt') })

/** @type {Array<Array<any>>} */
const grid = []

input.on('line', line => {
  grid.push(line.split(''))
})

input.on('close', () => {
  console.time('total duration')

  let direction = 'above'

  const { getSingle } = makeGridTraverser(grid)

  let { posX, posY } = findCursor(grid)

  const startPosX = posX
  const startPosY = posY

  const blockedCoords = new Set()

  while (direction) {
    const { newIdxX, newIdxY, value } = getSingle(direction)(posX, posY)

    if (value !== '#' && value !== '^') {
      const pos = `${newIdxX}${newIdxY}`
      try {
        const newGrid = R.clone(grid)

        newGrid[newIdxX][newIdxY] = 'O'

        if (!blockedCoords.has(pos)) {
          walkGrid({ cursorPos: [startPosX, startPosY], grid: newGrid })
        }
      } catch (e) {
        blockedCoords.add(pos)
      }
    }

    if (value === '#') {
      direction = getNextDirection(direction)
    } else {
      posX = newIdxX
      posY = newIdxY
    }

    if (!value) { break }
  }

  // 13 niet correct <-- incorrect input
  // 14753 too high
  // 3494 not right
  // 3495 not right
  // 3647 not right
  // 1518 not right
  // 1514 not right
  // 1266 not right
  // 1302 not right

  // to get to: 1304
  // behaald met hulp van https://github.com/derfritz/AoC24/blob/main/Day6/solution.js
  // echter oplossing ge pair-programmed. niet gekopieerd.
  // alleen het doel gevonden zodat ik niet permanent hoefde te wachten
  console.log({ infiniteLoops: blockedCoords.size })
  console.timeEnd('total duration')
})

function walkGrid ({ cursorPos: [x, y], grid }) {
  const visitedPositions = new Set()

  const { getSingle } = makeGridTraverser(grid)

  let direction = 'above'

  while (direction) {
    const pos = `${direction} - ${x},${y}`
    if (visitedPositions.has(pos)) throw new Error('infinite')

    visitedPositions.add(pos)

    const { newIdxX, newIdxY, value } = getSingle(direction)(x, y)

    if (!value) direction = null

    if (value === '#' || value === 'O') {
      direction = getNextDirection(direction)
    } else {
      x = newIdxX
      y = newIdxY
    }
  }
}
