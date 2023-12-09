const fs = require('fs')
const readline = require('readline')

const input = readline.createInterface({ input: fs.createReadStream('./input.txt') })

const schematic = []

input.on('line', line => {
  schematic.push(line)
})

input.on('close', () => {
  const input = schematic
  let total = 0

  schematic.forEach((line, idx) => {
    const numbers = []
    /** @type {RegExp} */
    const isNumRegex = /\d+/g
    let match = ''

    while ((match = isNumRegex.exec(line)) !== null) {
      numbers.push({ start: match.index, end: isNumRegex.lastIndex, number: +match[0] })
    }

    for (const number of numbers) {
      let toAdd = false

      for (let r = idx - 1; r <= idx + 1; r++) {
        for (let c = number.start - 1; c <= number.end; c++) {
          if (r >= 0 && r < input.length && c >= 0 && input[idx].length > c) {
            if (isNaN(parseInt(input[r][c])) && input[r][c] !== '.') {
              toAdd = true
            }
          }
        }
      }
      if (toAdd) total += number.number
    }
  })

  console.log(total)
})
