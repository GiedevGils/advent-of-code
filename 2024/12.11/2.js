const fs = require('fs')
const readline = require('readline')
const { calculateNewValues } = require('./lib')
const R = require('ramda')

const input = readline.createInterface({ input: fs.createReadStream('./input.txt') })

/** @type {Record<string, {occurences: number, newValues: Array<number>}} */
const stones = {}

input.on('line', line => {
  line.split(' ').map(Number).forEach(nr => {
    stones[nr] = { occurences: 1, newValues: [] }
  })
})

input.on('close', () => {
  console.time('total duration')
  console.timeLog('total duration', 'start')

  const nrOfBlinks = 75

  for (let i = 0; i < nrOfBlinks; i++) {
    const stoneClone = R.clone(stones)

    Object.entries(stoneClone)
      .filter(([k, v]) => v.occurences)
      .forEach(([nr, { newValues }]) => {
        const int = Number(nr)

        const nrOfLoops = stoneClone[nr].occurences
        if (!newValues.length) {
          newValues = calculateNewValues(int)
          stones[nr].newValues = newValues
        }

        newValues.forEach(x => {
          createOrIncrease(x, nrOfLoops)
        })
        stones[nr].occurences -= nrOfLoops
      })

    console.timeLog('total duration', i + 1)
  }

  console.log({ nrOfStones: Object.values(stones).reduce((a, c) => (a += c.occurences), 0) })

  console.timeEnd('total duration', 'end')
})

function createOrIncrease (nr, by) {
  if (!stones[nr]) stones[nr] = { occurences: 0, newValues: [] }

  stones[nr].occurences += by
}
