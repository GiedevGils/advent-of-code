const fs = require('fs')
const readline = require('readline')

const input = readline.createInterface({ input: fs.createReadStream('./input.txt') })

const loss = 'X'
const draw = 'Y'
const win = 'Z'

const pointMap = { X: 0, Y: 3, Z: 6 }

const getScore = input => {
  if (['A'].includes(input)) return 1
  if (['B'].includes(input)) return 2
  if (['C'].includes(input)) return 3
}

const map = {
  A: {
    [draw]: 'A',
    [loss]: 'C',
    [win]: 'B'
  },
  B: {
    [draw]: 'B',
    [loss]: 'A',
    [win]: 'C'
  },
  C: {
    [draw]: 'C',
    [loss]: 'B',
    [win]: 'A'
  }
}
const calculateScore = response => toAdd => getScore(response) + toAdd

let score = 0

input.on('line', line => {
  const [action, requiredResult] = line.split(' ')
  const response = map[action][requiredResult]
  score += calculateScore(response)(pointMap[requiredResult])
})

input.on('close', () => {
  console.log(score)
})
