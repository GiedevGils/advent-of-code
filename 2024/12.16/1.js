const fs = require('fs')
const readline = require('readline')
const { makeGridTraverser, createCoordinate } = require('../../lib/js')
const { clone } = require('ramda')

const input = readline.createInterface({ input: fs.createReadStream('./input.txt') })

const grid = []

input.on('line', line => {
  grid.push(line.split(''))
})

const { getDirectSurrounding } = makeGridTraverser(grid)

input.on('close', () => {
  console.time('total duration')
  console.timeLog('total duration', 'start')

  const paths = findPaths(grid)

  console.log(paths)

  const scores = paths.map(({ steps, turns }) => {
    return steps + (turns * 1000)
  })

  // 111404 too high
  // 107408 too high

  // goal: 93436 - https://github.com/coryannj/advent_of_code/tree/main
  console.log({ result: Math.min(...scores) })
  console.timeEnd('total duration', 'end')
})

/**
 * @template T
 * @param {T[][]} grid
 * @param {T[]} blockerCharacters
 * @param {T[]} openCharacters
 * @param {T} start
 * @param {T} end
 */
function findPaths () {
  let startPos
  /** @type {string} */
  let endPos

  grid.forEach((row, x) => {
    row.forEach((cell, y) => {
      if (cell === 'S') {
        startPos = [x, y]
      }

      if (cell === 'E') {
        endPos = createCoordinate(x, y)
      }
    })
  })

  const paths = []
  const surrounding = Object.entries(getDirectSurrounding(...startPos))
  const queue = []

  surrounding.forEach(([direction, coords]) => {
    if (coords.value !== '#') {
      queue.push({
        coords: startPos,
        pathLength: 0,
        turns: direction === 'right' ? 0 : 1,
        direction,
        visited: new Set(createCoordinate(...startPos))
      })
    }
  })

  while (queue.length) {
    const { coords, pathLength, direction, turns, visited } = queue.shift()

    const stringCoords = createCoordinate(...coords)

    if (stringCoords === endPos) {
      paths.push({ steps: pathLength, turns })
      continue
    }

    if (visited.has(`${stringCoords}-${direction}`)) {
      continue
    }

    visited.add(`${stringCoords}-${direction}`)

    const surrounding = Object.entries(getDirectSurrounding(...coords))

    surrounding.forEach(([newDirection, newCoords]) => {
      if (newCoords.value !== '#') {
        let turnsToAdd = 0

        if (direction === newDirection) {
          // do nothing
        } else if (
          (newDirection === 'above' && direction === 'below') ||
          (newDirection === 'below' && direction === 'above') ||
          (newDirection === 'left' && direction === 'right') ||
          (newDirection === 'right' && direction === 'left')
        ) {
          turnsToAdd = 2
        } else {
          turnsToAdd = 1
        }

        queue.push({
          coords: [newCoords.newIdxX, newCoords.newIdxY],
          pathLength: pathLength + 1,
          turns: turns + turnsToAdd,
          direction: newDirection,
          visited: clone(visited)
        })
      }
    })
  }

  return paths
}
