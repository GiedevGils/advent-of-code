const fs = require('fs')
const readline = require('readline')
const { makeGridTraverser, createCoordinate } = require('../../lib/js/grid')
const { makeArrayToCheck } = require('./lib')

const input = readline.createInterface({ input: fs.createReadStream('./input.txt') })

const grid = []

input.on('line', line => {
  grid.push(line.split('').map(Number))
})

const { getSurrounding } = makeGridTraverser(grid)

input.on('close', () => {
  console.time('total duration')
  console.timeLog('total duration', 'start')

  const startingIndices = []

  grid.forEach((line, iX) => {
    line.forEach((height, iY) => {
      if (height === 0) {
        startingIndices.push(createCoordinate(iX, iY))
      }
    })
  })

  let totalScore = 0

  for (const index of startingIndices) {
    const uniqueNines = new Set()
    const visited = new Set()
    const queue = []

    const [iX, iY] = index.split(',').map(Number)

    queue.push({ coords: createCoordinate(iX, iY), prevValue: -1 })

    while (queue.length) {
      const { coords, prevValue } = queue.shift()
      const [iX, iY] = coords.split(',').map(Number)
      const currValue = grid[iX][iY]

      if (visited.has(coords)) {
        continue
      }

      if (currValue !== prevValue + 1) {
        continue
      }

      if (currValue === 9) {
        uniqueNines.add(createCoordinate(iX, iY))
      } else {
        visited.add(coords)

        const surrounding = makeArrayToCheck(getSurrounding(iX, iY))

        queue.push(
          ...surrounding.map(x =>
            ({ coords: createCoordinate(x.newIdxX, x.newIdxY), prevValue: currValue })
          )
        )
      }
    }

    totalScore += uniqueNines.size
  }

  console.log({ totalScore })
  console.timeEnd('total duration', 'end')
})
