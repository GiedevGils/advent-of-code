const fs = require('fs')
const readline = require('readline')

const input = readline.createInterface({ input: fs.createReadStream('./input.txt') })
const lines = []

input.on('line', line => {
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

  const nodesToRun = Object.keys(tree).filter(key => key.endsWith('A'))
  let instructionIdx = 0

  let currentNode
  const lcmnrs = []

  nodesToRun.forEach((node, idx) => {
    let cycle = 0
    currentNode = node
    while (!currentNode.endsWith('Z')) {
      const instruction = instructions[instructionIdx]

      currentNode = tree[currentNode][instruction === 'L' ? 'childLeft' : 'childRight']

      if (instructionIdx === instructions.length - 1) instructionIdx = 0
      else instructionIdx++

      cycle++
    }

    lcmnrs.push(cycle)
  })

  // de LCM oplossing overgenomen van https://www.reddit.com/r/adventofcode/comments/18df7px/comment/kcgyf7a
  console.log({ lcmnrs, lcmnr: lcmnrs.reduce((acc, curr) => lcm(acc, curr), 1) })
})

const gcd = (a, b) => {
  if (b === 0) return a
  return gcd(b, a % b)
}

const lcm = (a, b) => {
  return (a * b) / gcd(a, b)
}
