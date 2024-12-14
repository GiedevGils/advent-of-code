const fs = require('fs')
const readline = require('readline')

const { makeGridTraverser, createCoordinate } = require('../../lib/js')

const input = readline.createInterface({ input: fs.createReadStream('./input.txt') })

const grid = []

input.on('line', line => {
  grid.push(line.split(''))
})

const { getDirectSurrounding } = makeGridTraverser(grid)

input.on('close', () => {
  console.time('total duration')
  console.timeLog('total duration', 'start')

  const plots = []
  const visited = new Set()

  grid.forEach((row, idxX) => {
    row.forEach((currentPlant, idxY) => {
      const currentCoord = createCoordinate(idxX, idxY)

      if (visited.has(currentCoord)) return

      const queue = []

      queue.push({ coords: currentCoord, prevValue: currentPlant })

      const currentPlot = []

      console.timeLog('total duration')

      while (queue.length) {
        const { coords, prevValue } = queue.shift()
        const [iX, iY] = coords.split(',').map(Number)

        if (visited.has(coords)) continue // we have already added this item to its plot

        if (prevValue === currentPlant) {
          currentPlot.push(coords)
          visited.add(coords)
        } else {
          continue
        }

        const surrounding = getDirectSurrounding(iX, iY)
        queue.push(
          ...Object.values(surrounding)
            .filter(x => x.value)
            .map(x => ({ coords: createCoordinate(x.newIdxX, x.newIdxY), prevValue: x.value })))
      }

      plots.push(currentPlot)
    })
  })

  console.log(plots)

  const price = determinePrice(plots)

  console.log({ price })

  console.timeEnd('total duration', 'end')
})

function determinePrice (plots) {
  let price = 0

  plots.forEach((plot) => {
    let corners = 0

    if (plot.length === 1) corners = 4

    if (plot.length > 1) {
      plot.forEach(coord => {
        const [x, y] = coord.split(',').map(Number)
        const plant = grid[x][y]

        const surrounding = getDirectSurrounding(x, y)
        const sameNeighbours = {}

        Object.entries(surrounding).forEach(([key, value]) => {
          if (value.value === plant) {
            sameNeighbours[key] = value
          }
        })

        const keys = Object.keys(sameNeighbours)

        console.log(keys)

        if (keys.length === 2 && !(
          ['above', 'below'].every(x => keys.includes(x)) ||
          ['left', 'right'].every(x => keys.includes(x))
        )) {
          corners++
        }
        if (keys.length === 1) corners += 2
      })
    }

    console.log({
      area: plot.length,
      corners
    })

    price += corners * plot.length
  })

  return price
}
