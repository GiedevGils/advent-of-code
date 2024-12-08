const fs = require('fs')
const readline = require('readline')
const input = readline.createInterface({ input: fs.createReadStream('./input.txt') })

const R = require('ramda')

const { makeGridTraverser } = require('../../lib/js')

const grid = []

input.on('line', line => {
  grid.push(line.split(''))
})

input.on('close', () => {
  console.time('total duration')
  console.timeLog('total duration', 'start')

  const { isValid } = makeGridTraverser(grid)

  // console.table(grid)

  const antinodes = new Set()

  /** @type {Array<{value: string, x: number, y: number}} */
  const antennas = []

  grid.forEach((line, iX) => {
    line.forEach((val, iY) => {
      if (val !== '.') antennas.push({ value: val, x: iX, y: iY })
    })
  })

  antennas.forEach(antenna => {
    const otherAntennas = antennas.filter(x => !R.equals(antenna, x) && antenna.value === x.value)
    const { x, y } = antenna

    otherAntennas.forEach(otherAntenna => {
      const { x: oX, y: oY } = otherAntenna

      const isHigher = oX < x
      const isLeft = oY < y

      const antinodeX = isHigher ? x + (x - oX) : x - (oX - x)
      const antinodeY = isLeft ? y + (y - oY) : y - (oY - y)

      if (isValid(antinodeX, antinodeY)) antinodes.add(createCoordinate(antinodeX, antinodeY))
    })
  })

  console.log({ antinodes: antinodes.size })
  console.timeEnd('total duration', 'end')
})

function createCoordinate (x, y) {
  return `${x},${y}`
}
