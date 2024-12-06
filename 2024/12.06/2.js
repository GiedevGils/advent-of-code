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
  console.time('total')

  let possibleBlockages = 0

  for (let idxX = 0; idxX < grid.length; idxX++) {
    console.timeLog('total')
    const line = grid[idxX]

    for (let idxY = 0; idxY < line.length; idxY++) {
      const element = line[idxY]

      if (element === '#') continue

      const newGrid = R.clone(grid)

      newGrid[idxX][idxY] = 'O'

      const isFinite = isGridFinite(newGrid)

      if (!isFinite) possibleBlockages++
    }
  }

  // 13 niet correct <-- incorrect input
  // 14753 too high
  console.log({ possibleBlockages })
  console.timeEnd('total')
})

function isGridFinite (grid) {
  const visitedDirectionPositions = new Set()
  const { getSingle } = makeGridTraverser(grid)
  let { posX, posY } = findCursor(grid)

  let direction = 'above'

  while (direction) {
    // if the cursor has already passed ovre this location with this specific direction
    // it is stuck in a loop
    if (visitedDirectionPositions.has(`${direction}${posX}${posY}`)) return false

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
