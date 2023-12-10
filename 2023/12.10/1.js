const fs = require('fs')
const readline = require('readline')

const input = readline.createInterface({ input: fs.createReadStream('./input.txt') })

/** @type {string[][]} */
const diagram = []
const connectedDiagram = []
const passedPositions = new Set()

input.on('line', line => {
  diagram.push(line.split(''))
})

input.on('close', () => {
  const startPos = getStartPos()

  const connectedPipes = getConnectingPipes(startPos)

  checkLocation(Object.values(connectedPipes))

  console.log({ distance: (distance + 1) / 2 })
})

/** @returns {number[]} */
function getStartPos () {
  let startPos = []
  for (let r = 0; r < diagram.length; r++) {
    const column = diagram[r]
    if (startPos.length) break
    for (let c = 0; c < column.length; c++) {
      const char = column[c]
      if (char === 'S') {
        startPos = [r, c]
        break
      }
    }
  }

  return startPos
}

/** @param {number[]} location */
function getConnectingPipes (location) {
  if (location.length > 2) throw new Error('location larger than 2', location)
  const [row, column] = location

  const character = diagram[row][column]

  const pipeNorth = diagram[row - 1] && diagram[row - 1][column]
  const pipeSouth = diagram[row + 1] && diagram[row + 1][column]
  const pipeEast = diagram[row][column + 1] && diagram[row][column + 1]
  const pipeWest = diagram[row][column - 1] && diagram[row][column - 1]

  const result = {}

  if (['|', '7', 'F'].includes(pipeNorth)) result.north = [row - 1, column]
  if (['|', 'L', 'J'].includes(pipeSouth)) result.south = [row + 1, column]
  if (['-', 'J', '7'].includes(pipeEast)) result.east = [row, column + 1]
  if (['-', 'L', 'F'].includes(pipeWest)) result.west = [row, column - 1]

  if (character === '|') { delete result.west; delete result.east } // only n + s relevant
  if (character === '-') { delete result.north; delete result.south } // only w+e relevant
  if (character === 'J') { delete result.south; delete result.east } // only w+n relevant
  if (character === '7') { delete result.north; delete result.east } // only s+w relevant
  if (character === 'L') { delete result.south; delete result.west } // only n+e relevant
  if (character === 'F') { delete result.north; delete result.west } // only s+e relevant

  return result
}

let distance = 0

function checkLocation (locations) {
  if (!locations.length) return
  const locationsToCheck = []

  for (let i = 0; i < locations.length; i++) {
    const location = locations[i]

    if (passedPositions.has(`${location.join(',')}`)) {
      continue
    }
    passedPositions.add(`${location.join(',')}`)

    const [row, column] = location

    if (!connectedDiagram[row]) connectedDiagram[row] = []

    connectedDiagram[row][column] = distance

    const pipesToCheck = getConnectingPipes(location)

    Object.values(pipesToCheck).forEach(loc => {
      locations.push(loc)
    })
    distance++
  }

  checkLocation(locationsToCheck)
}
