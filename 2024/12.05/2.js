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
  /** @type {Array<Array<Number>>} */
  const unsafeUpdates = []
  const isSafeUpdate = makeIsSafeUpdate(order)

  updates.forEach((update) => {
    if (!isSafeUpdate(update)) unsafeUpdates.push(update)
  })

  unsafeUpdates.forEach(update => {
    update.sort((x, y) => {
      if (order[x] && order[x].includes(y)) return -1

      return 1
    })
  })

  const total = unsafeUpdates.reduce((acc, current) => {
    return acc + current[Math.floor(current.length / 2)]
  }, 0)

  console.log({ nrOfSafe: unsafeUpdates.length, total })
})
