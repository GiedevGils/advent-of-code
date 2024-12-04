const fs = require('fs')
const readline = require('readline')

const input = readline.createInterface({ input: fs.createReadStream('./input.txt') })

const grid = []

input.on('line', line => {
  grid.push(line.split(''))
})

function isValid (x, y) {
  return x >= 0 && x < grid.length && y >= 0 && y < grid[0].length
}

input.on('close', () => {
  let occurences = 0

  grid.forEach((line, idxX) => {
    line.forEach((char, idxY) => {
      if (char === 'A') {
        if (
          isValid(idxX - 1, idxY - 1) &&
          isValid(idxX - 1, idxY + 1) &&
          isValid(idxX + 1, idxY - 1) &&
          isValid(idxX + 1, idxY + 1)
        ) {
          const topleft = grid[idxX - 1][idxY - 1]
          const topright = grid[idxX - 1][idxY + 1]
          const bottomleft = grid[idxX + 1][idxY - 1]
          const bottomright = grid[idxX + 1][idxY + 1]

          const options = ['MS', 'SM']

          if (options.includes(topleft + bottomright) && options.includes(topright + bottomleft)) occurences++
        }
      }
    })
  })

  console.log({ occurences })
})
