const fs = require('fs')
const readline = require('readline')
const { makeGridTraverser, createCoordinate } = require('../../lib/js')

const input = readline.createInterface({ input: fs.createReadStream('./input.txt') })

const grid = []

input.on('line', line => {
  grid.push(line.split(''))
})

const { getDirectSurrounding, isDirectAdjacent } = makeGridTraverser(grid)

input.on('close', () => {
  console.time('total duration')
  console.timeLog('total duration', 'start')

  const plots = {}

  grid.forEach((row, idxX) => {
    row.forEach((plant, idxY) => {
      const newCoord = createCoordinate(idxX, idxY)

      console.log(plots)

      if (plots[plant]) {
        const knownPlots = plots[plant]

        knownPlots.forEach((coords) => {
          const isDirectAdjacentToExisting = coords.some(coord => isDirectAdjacent(coord.split(',').map(Number), [idxX, idxY]))

          if (isDirectAdjacentToExisting) {
            coords.push(newCoord)
          }
        })
      }

      if (!plots[plant]) plots[plant] = [[newCoord]]
    })
  })

  console.log(plots)

  const price = determinePrice(plots)

  console.log({ price })

  console.timeEnd('total duration', 'end')
})

function determinePrice (plots) {
  let price = 0

  Object.entries(plots).forEach(([plant, coords]) => {
    const perimeter = []
    coords.forEach(coord => {
      const [x, y] = coord.split(',').map(Number)

      const surrounding = getDirectSurrounding(x, y)

      Object.values(surrounding).forEach(({ value, newIdxX, newIdxY }) => {
        if (value !== plant) {
          perimeter.push(createCoordinate(newIdxX, newIdxY))
        }
      })
    })
    price += coords.length * perimeter.length
    console.log({ plant, perimeter: perimeter.length, coords: coords.length })
  })

  return price
}
