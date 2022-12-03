const R = require('ramda')
const fs = require('fs')
const readline = require('readline')

const input = readline.createInterface({ input: fs.createReadStream('./input.txt') })
const alph = 'abcdefghijklmnopqrstuvwxyz'
const letterValues = `${alph}${alph.toUpperCase()}`.split('')

let result = 0

input.on('line', line => {
  const done = new Set()

  const [head, tail] = R.splitAt(line.length / 2, line)
  for (const letter of head) {
    if (tail.includes(letter) && !done.has(letter)) {
      result += letterValues.indexOf(letter) + 1 // woohoo array start at 0
      done.add(letter)
    }
  }
})

input.on('close', () => {
  console.log(result)
})
