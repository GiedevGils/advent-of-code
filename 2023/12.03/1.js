const fs = require('fs')
const readline = require('readline')

const input = readline.createInterface({ input: fs.createReadStream('./input.txt') })

const schematic = []
const numbers = []

input.on('line', line => {
  schematic.push(line.split(''))
})

input.on('close', () => {
  for (let x = 0; x < schematic.length; x++) { // rows
    let currentNumber = ''
    let needToAdd = false

    for (let y = 0; y < schematic[x].length; y++) { // columns
      const char = schematic[x][y]

      if (!isNaN(char)) {
        currentNumber += char
      }

      if (char === '.') {
        if (currentNumber.length > 0) numbers.push({ nr: +currentNumber, needToAdd, c: `${x + 1}, ${y}` })
        currentNumber = ''
        needToAdd = false
        continue
      }

      if (isSpecialCharacter(char)) continue

      const charsToCheck = [schematic[x][y - 1], schematic[x][y + 1]]

      if (schematic[x - 1]) {
        charsToCheck.push(schematic[x - 1][y + 1], schematic[x - 1][y - 1], schematic[x - 1][y])
      }

      if (schematic[x + 1]) {
        charsToCheck.push(schematic[x + 1][y + 1], schematic[x + 1][y - 1], schematic[x + 1][y])
      }

      if (charsToCheck.some(x => isSpecialCharacter(x))) needToAdd = true
    }
  }

  console.log(numbers)
  console.log(numbers.filter(x => x.needToAdd).map(x => x.nr).reduce((prev, curr) => prev + curr, 0))
})

function isSpecialCharacter (str) {
  return '*$+-%#&=/@'.includes(str)
}
