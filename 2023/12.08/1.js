const fs = require('fs')
const readline = require('readline')

const input = readline.createInterface({ input: fs.createReadStream('./input.txt') })

const lines = []

input.on('line', (line) => {
  lines.push(line)
})

input.on('close', () => {
  const [instructions, empty, ..._lines] = lines

  const tree = {}

  _lines.forEach(line => {
    const node = line.substring(0, 3)
    const childLeft = line.substring(7, 10)
    const childRight = line.substring(12, 15)

    tree[node] = { childLeft, childRight }
  })

  const finalNode = 'ZZZ'
  let currentNode = 'AAA'
  let instructionIdx = 0
  let cycle = 0

  while (currentNode !== finalNode) {
    const instruction = instructions[instructionIdx]

    currentNode = tree[currentNode][instruction === 'L' ? 'childLeft' : 'childRight']

    if (instructionIdx === instructions.length - 1) instructionIdx = 0
    else instructionIdx++

    cycle++
  }

  console.log({ cycle })
})
