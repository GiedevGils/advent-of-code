const fs = require('fs')
const readline = require('readline')

const input = readline.createInterface({ input: fs.createReadStream('./input.txt') })

let total = 0

input.on('line', line => {
  let lineValue = ''
  for (const char of line) {
    if (!isNaN(char)) lineValue += char
  }

  if (lineValue.length > 2) lineValue = `${lineValue.at(0)}${lineValue.at(-1)}`
  if (lineValue.length === 1) lineValue = `${lineValue}${lineValue}`

  total += +lineValue
})

input.on('close', () => {
  console.log(total)
})
