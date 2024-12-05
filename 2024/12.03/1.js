const fs = require('fs')
const readline = require('readline')

const input = readline.createInterface({ input: fs.createReadStream('./input.txt') })

let mem = ''

input.on('line', line => {
  mem += line
})

input.on('close', () => {
  const regexp = /(mul\(\d+,\d+\))/g
  const groups = mem.matchAll(regexp)

  let total = 0

  for (const match of groups) {
    const expression = match[0]

    const digits = expression.matchAll(/(\d+)/g)

    const nrs = []

    for (const digit of digits) {
      nrs.push(Number(digit[0]))
    }

    const matchResult = nrs.reduce((prev, curr) => {
      return prev * curr
    }, 1)

    total += matchResult
  }

  console.log(total)
})
