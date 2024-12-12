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

      const plotsForPlant = plots[plant]

      if (plotsForPlant) {
        const knownPlots = plotsForPlant

        let isRelated = false

        knownPlots.forEach((coords, idx) => {
          const isDirectAdjacentToExisting = coords.some(coord => isDirectAdjacent(coord.split(',').map(Number), [idxX, idxY]))

          if (isDirectAdjacentToExisting) {
            plots[plant][idx].push(newCoord)
            isRelated = true
          }
        })

        if (!isRelated) plots[plant].push([newCoord])
      }

      if (!plotsForPlant) plots[plant] = [[newCoord]]
    })
  })

  console.table(grid)
  console.log(plots)

  const price = determinePrice(plots)

  console.log({ price })

  console.timeEnd('total duration', 'end')
})

function determinePrice (plots) {
  let price = 0

  Object.entries(plots).forEach(([plant, plots]) => {
    plots.forEach(coords => {
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

      console.log({
        plant,
        area: coords.length,
        perimeter: perimeter.length
      })

      price += perimeter.length * coords.length
    })
  })

  return price
}
