const fs = require('fs')
const readline = require('readline')

const input = readline.createInterface({ input: fs.createReadStream('./input.txt') })

/** @type {string[][]} */
const diagram = []

input.on('line', line => {
  diagram.push(line.split(''))
})

const enclosedLocations = {}

input.on('close', () => {
  for (let r = 0; r < diagram.length; r++) {
    const row = diagram[r]

    for (let c = 0; c < row.length; c++) {
      const char = diagram[r][c]
      if (char === '.') {
        isEnclosed([[r, c]])
      }
    }
  }

  console.log(enclosedLocations)

  console.log(Object.values(enclosedLocations).filter(Boolean).length)
})

function isEnclosed (locations) {
  for (let idx = 0; idx < locations.length; idx++) {
    const location = locations[idx]

    const [row, column] = location

    if (enclosedLocations[`${row}.${column}`] !== undefined) continue

    const locationsToCheck = []

    const charNorth = diagram[row - 1] && diagram[row - 1][column]
    const charSouth = diagram[row + 1] && diagram[row + 1][column]
    const charEast = diagram[row][column + 1] && diagram[row][column + 1]
    const charWest = diagram[row][column - 1] && diagram[row][column - 1]

    let enclosedNorth = false
    let enclosedSouth = false
    let enclosedEast = false
    let enclosedWest = false

    if (charNorth === '.') {
      enclosedNorth = locationsToCheck.push([row - 1, column])
    } else {
      if (['-', 'L', 'J'].includes(charNorth)) enclosedNorth = true
    }
    if (charSouth === '.') {
      enclosedSouth = locationsToCheck.push([row + 1, column])
    } else {
      if (['-', 'F', '7'].includes(charSouth)) enclosedSouth = true
    }
    if (charEast === '.') {
      enclosedEast = locationsToCheck.push([row, column + 1])
    } else {
      if (['|', 'L', 'F'].includes(charEast)) enclosedEast = true
    }
    if (charWest === '.') {
      enclosedWest = locationsToCheck.push([row, column - 1])
    } else {
      if (['|', 'J', '7'].includes(charWest)) enclosedWest = true
    }

    const answer = enclosedNorth && enclosedEast && enclosedSouth && enclosedWest

    enclosedLocations[`${row}.${column}`] = answer
    isEnclosed(locationsToCheck)
  }
}
