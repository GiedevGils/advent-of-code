const fs = require('fs')
const readline = require('readline')

const input = readline.createInterface({ input: fs.createReadStream('./input.txt') })

const grid = []

input.on('line', line => {
  grid.push(line.split(''))
})

const directions = [
  { dx: -1, dy: 0 }, // Up
  { dx: 1, dy: 0 }, // Down
  { dx: 0, dy: -1 }, // Left
  { dx: 0, dy: 1 }, // Right
  { dx: -1, dy: -1 }, // Top-left
  { dx: -1, dy: 1 }, // Top-right
  { dx: 1, dy: -1 }, // Bottom-left
  { dx: 1, dy: 1 } // Bottom-right
]

function isValid (x, y) {
  return x >= 0 && x < grid.length && y >= 0 && y < grid[0].length
}

input.on('close', () => {
  let occurences = 0

  grid.forEach((line, idxX) => {
    line.forEach((char, idxY) => {
      if (char === 'X') {
        for (const { dx, dy } of directions) {
          let iX = idxX + dx
          let iY = idxY + dy

          if (!isValid(iX, iY) || grid[iX][iY] !== 'M') {
            continue
          }

          iX += dx
          iY += dy

          if (!isValid(iX, iY) || grid[iX][iY] !== 'A') {
            continue
          }

          iX += dx
          iY += dy

          if (!isValid(iX, iY) || grid[iX][iY] !== 'S') {
            continue
          }

          occurences++
        }
      }
    })
  })

  console.log({ occurences })
})
