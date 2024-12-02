const fs = require('fs')
const readline = require('readline')

const input = readline.createInterface({ input: fs.createReadStream('./input.txt') })

const left = []
const right = []

input.on('line', line => {
  const [l, r] = line.split('   ')

  left.push(Number(l))
  right.push(Number(r))
})

input.on('close', () => {
  let simScore = 0

  left.forEach(x => simScore += x * right.filter(y => x === y).length)

  console.log(simScore)

})
