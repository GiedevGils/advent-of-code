const fs = require('fs')
const readline = require('readline')

const input = readline.createInterface({ input: fs.createReadStream('./input.txt') })
const alph = 'abcdefghijklmnopqrstuvwxyz'
const letterValues = `${alph}${alph.toUpperCase()}`.split('')
const getValue = lttr => letterValues.indexOf(lttr) + 1

let result = 0
let current = 0
let idx = 0
const groups = {}

input.on('line', line => {
  if (!groups[current]) groups[current] = {}
  groups[current][idx] = Array.from(new Set(line.split('')))

  if (idx === 2) {
    result += groups[current][0].reduce((a, b) => {
      if (groups[current][1].includes(b) && groups[current][2].includes(b)) return a + getValue(b)
      return a
    }, 0)
    current++
    idx = 0
  } else {
    idx++
  }
})

input.on('close', () => {
  console.log(result)
})
