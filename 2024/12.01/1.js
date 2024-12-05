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
  left.sort()
  right.sort()

  let diff = 0

  left.forEach((leftVal, idx) => {
    const rightVal = right[idx]

    diff += Math.abs(leftVal - rightVal)
  })

  console.log(diff)
})
