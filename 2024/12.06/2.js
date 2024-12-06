const fs = require('fs')
const readline = require('readline')
const { makeGridTraverser } = require('../../lib/js')
const { findCursor, getNextDirection } = require('./lib')
const R = require('ramda')

const input = readline.createInterface({ input: fs.createReadStream('./input.txt') })

/** @type {Array<Array<any>>} */
const grid = []

input.on('line', line => {
  grid.push(line.split(''))
})

input.on('close', () => {
  console.time('total duration')

  let possibleBlockages = 0
  const blockedPositions = new Set()

  const { getSingle } = makeGridTraverser(grid)
  let { posX, posY } = findCursor(grid)

  let direction = 'above'

  while (direction) {
    const { newIdxX, newIdxY, value } = getSingle(direction)(posX, posY)

    if (!value) direction = null

    if (value === '#') {
      direction = getNextDirection(direction)
    } else {
      posX = newIdxX
      posY = newIdxY

      const newGrid = R.clone(grid)
      if (value) newGrid[newIdxX][newIdxY] = 'O'

      if (!isGridFinite(grid, newGrid)) {
        blockedPositions.add(`${newIdxX},${newIdxY}`)
        possibleBlockages = blockedPositions.size
      }
    }
  }

  // 13 niet correct <-- incorrect input
  // 14753 too high
  // 3494 not right
  // 3495 not right
  // 3647 not right
  console.log({ possibleBlockages })
  console.timeEnd('total duration')
})

function isGridFinite (grid, newGrid) {
  const visitedDirectionPositions = new Set()
  const { getSingle } = makeGridTraverser(newGrid)
  let { posX, posY } = findCursor(grid)

  let direction = 'above'

  while (direction) {
    // if the cursor has already passed ovre this location with this specific direction
    // it is stuck in a loop
    if (visitedDirectionPositions.has(`${direction}${posX}${posY}`)) {
      return false
    }

    visitedDirectionPositions.add(`${direction}${posX}${posY}`)

    const { newIdxX, newIdxY, value } = getSingle(direction)(posX, posY)

    const newDirection = getNextDirection(direction)

    if (!value) return true

    if (value === '#' || value === 'O') {
      direction = newDirection
    } else {
      posX = newIdxX
      posY = newIdxY
    }
  }
}
