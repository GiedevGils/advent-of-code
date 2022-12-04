const fs = require('fs')
const readline = require('readline')

const input = readline.createInterface({ input: fs.createReadStream('./input.txt') })
const isWithinOrEqual = (number, range) => {
  const [head, tail] = range.split('-')
  return number >= +head && number <= +tail
}
let result = 0

input.on('line', line => {
  const [pair1, pair2] = line.split(',')
  if (
    pair1.split('-').some(x => isWithinOrEqual(+x, pair2)) ||
    pair2.split('-').some(x => isWithinOrEqual(+x, pair1))
  ) {
    result++
  }
})

input.on('close', () => {
  console.log(result)
})
