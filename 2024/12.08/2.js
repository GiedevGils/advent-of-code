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

      antinodes.add(createCoordinate(oX, oY))

      const isHigher = oX < x
      const isLeft = oY < y

      const diffX = Math.abs(x - oX)
      const diffY = Math.abs(y - oY)

      let antinodeX = isHigher ? x + diffX : x - diffX
      let antinodeY = isLeft ? y + diffY : y - diffY

      while (isValid(antinodeX, antinodeY)) {
        antinodes.add(createCoordinate(antinodeX, antinodeY))

        antinodeX = isHigher ? antinodeX + diffX : antinodeX - diffX
        antinodeY = isLeft ? antinodeY + diffY : antinodeY - diffY
      }
    })
  })

  // 590 too low
  console.log({ antinodes: antinodes.size })
  console.timeEnd('total duration', 'end')
})

function createCoordinate (x, y) {
  return `${x},${y}`
}
