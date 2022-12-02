const fs = require('fs')
const readline = require('readline')

const input = readline.createInterface({ input: fs.createReadStream('./input.txt') })

// A and X == rock
// B and Y == paper
// C and Z == scissors

const getScore = input => {
  if (['A', 'X'].includes(input)) return 1
  if (['B', 'Y'].includes(input)) return 2
  if (['C', 'Z'].includes(input)) return 3
}

const map = { A: 'X', B: 'Y', C: 'Z' }

const victoryConditions = {
  X: 'C',
  Y: 'A',
  Z: 'B'
}
const isVictory = (action, response) => victoryConditions[response] === action

const calculateScore = response => toAdd => getScore(response) + toAdd

let score = 0

input.on('line', line => {
  const [action, response] = line.split(' ')
  const calc = calculateScore(response)

  if (response === map[action]) score += calc(3)
  else if (isVictory(action, response)) score += calc(6)
  else score += calc(0)
})

input.on('close', () => {
  console.log(score)
})
