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
    const perimeter = []

    plot.forEach(coord => {
      const [x, y] = coord.split(',').map(Number)
      const plant = grid[x][y]

      const surrounding = getDirectSurrounding(x, y)

      Object.values(surrounding).forEach(({ value, newIdxX, newIdxY }) => {
        if (value !== plant) {
          perimeter.push(createCoordinate(newIdxX, newIdxY))
        }
      })
    })

    console.log({
      area: plot.length,
      perimeter: perimeter.length
    })

    price += perimeter.length * plot.length
  })

  return price
}
