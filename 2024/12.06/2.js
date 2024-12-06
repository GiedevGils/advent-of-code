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

      const isFinite = isGridFinite(grid, newGrid)

      if (!isFinite) possibleBlockages++
    }
  }

  // 13 niet correct <-- incorrect input
  // 14753 too high
  console.log({ possibleBlockages })
  console.timeEnd('total')
})

function isGridFinite (grid, newGrid) {
  const { getSingle, getAll } = makeGridTraverser(newGrid)
  let { posX, posY } = findCursor(grid)
  let direction = 'above'

  let hasNoticedO = false

  setInterval(() => {
    console.log(direction)
  }, 500)

  while (direction) {
    const { newIdxX, newIdxY, value } = getSingle(direction)(posX, posY)
    const newDirection = getNextDirection(direction)

    if (hasNoticedO && value === 'O' && getAll(newDirection)(posX, posY).includes('#')) return false
    if (!hasNoticedO && value === 'O') hasNoticedO = true
    if (!value) return true

    if (value === '#' || value === 'O') {
      direction = newDirection
    } else {
      posX = newIdxX
      posY = newIdxY
    }
  }
}
