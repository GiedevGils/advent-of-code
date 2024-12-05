const fs = require('fs')
const readline = require('readline')
const { makeIsSafeUpdate } = require('./lib')

const input = readline.createInterface({ input: fs.createReadStream('./input.txt') })

/** @type {Record<string, Array<number>} */
const order = {}
/** @type {Array<Array<Number>>} */
const updates = []

input.on('line', line => {
  if (line.includes('|')) {
    const [nr1, nr2] = line.split('|').map(Number)

    if (!order[nr1]) order[nr1] = []

    order[nr1].push(nr2)
  }

  if (line.includes(',')) {
    updates.push(line.split(',').map(Number))
  }
})

input.on('close', () => {
  const safeUpdates = []

  const isSafeUpdate = makeIsSafeUpdate(order)

  updates.forEach((update) => {
    if (isSafeUpdate(update)) safeUpdates.push(update)
  })

  const total = safeUpdates.reduce((acc, current) => {
    return acc + current[Math.floor(current.length / 2)]
  }, 0)

  console.log({ nrOfSafe: safeUpdates.length, total })
})
