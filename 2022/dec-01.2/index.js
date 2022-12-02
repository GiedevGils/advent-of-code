const fs = require('fs')
const readline = require('readline')

const input = readline.createInterface({ input: fs.createReadStream('./input.txt') })

const output = []
let lineTotal = 0

input.on('line', line => {
  if (line !== '') {
    lineTotal += +line
  } else {
    output.push(lineTotal)
    lineTotal = 0
  }
})

input.on('close', () => {
  output.sort((x, y) => y - x)
  const [a, b, c] = output

  console.log(a + b + c)
})
