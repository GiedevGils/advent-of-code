const fs = require('fs')
const readline = require('readline')

const input = readline.createInterface({ input: fs.createReadStream('./input.txt') })

let total = 0

const strings = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '0',
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
  'zero'
]

const translator = {
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  0: 0,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  zero: 0
}

input.on('line', line => {
  const lineStringLocation = []
  for (const string of strings) {
    lineStringLocation.push({ string, idx: line.indexOf(string) })
    lineStringLocation.push({ string, idx: line.lastIndexOf(string) })
  }

  const sorted = lineStringLocation.filter(x => x.idx !== -1).sort((x, y) => x.idx - y.idx)
  const number = +`${translator[sorted.at(0).string]}${translator[sorted.at(-1).string]}`

  total += number
})

input.on('close', () => {
  console.log(total)
})
