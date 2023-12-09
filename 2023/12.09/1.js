const fs = require('fs')
const readline = require('readline')

const input = readline.createInterface({ input: fs.createReadStream('./input.txt') })

const history = []

input.on('line', line => {
  history.push(line.split(' ').map(x => +x))
})

input.on('close', () => {
  const toAdd = []

  history.forEach(his => {
    const res = getDifferences(his)
    his.push(his.at(-1) + res.at(-1))

    toAdd.push(his.at(-1))
  })

  console.log({ toAdd, answer: toAdd.reduce((p, c) => p + c) })
})

/** @param {number[]} history */
function getDifferences (history) {
  const differences = []

  history.reduce((prev, curr) => {
    differences.push(curr - prev)
    return curr
  })

  if (!differences.every(x => x === 0)) {
    const newDiffs = getDifferences(differences)

    differences.push(differences.at(-1) + newDiffs.at(-1))

    return differences
  } else {
    differences.push(0)
    return differences
  }
}
