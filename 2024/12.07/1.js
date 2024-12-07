const fs = require('fs')
const R = require('ramda')
const readline = require('readline')

const input = readline.createInterface({ input: fs.createReadStream('./input.txt') })

/** @type {Array<{total: number, additives: number[]}>} */
const numbers = []

input.on('line', line => {
  const [total, additives] = line.split(':')

  numbers.push({
    total: Number(total),
    additives: additives.trim().split(' ').map(Number)
  })
})

input.on('close', () => {
  console.time('total duration')
  console.timeLog('total duration', 'start')

  let calibrationResult = 0

  let loop = 0

  numbers.forEach(({ total, additives }) => {
    console.timeLog('total duration', loop)
    loop++

    let calcs = []

    for (let i = 0; i < additives.length; i++) {
      const nr = additives[i]

      if (i === 0) {
        calcs.push(nr.toString())
        continue
      }
      calcs = createCalculation(calcs, nr)
      if (i === 1) { calcs.shift() }
    }

    let canBeTrue = false

    calcs
      .filter(calc => {
        return additives.every(nr => calc.includes(nr))
      })
      .forEach(calc => {
        // console.log(calc)
        const result = eval(calc) // eslint-disable-line

        if (result === total) canBeTrue = true
      })
    if (canBeTrue) calibrationResult += total
  })

  // 945513094364 too high
  console.log({ calibrationResult })
  console.timeEnd('total duration')
})

/**
 * @param {Array<string>} arr
 * @param {number} nr
 *  */
function createCalculation (arr, nr) {
  const copy = R.clone(arr)

  copy.forEach((calculation) => {
    arr.push(`(${calculation}+${nr})`)
    arr.push(`(${calculation}*${nr})`)
  })

  return arr
}
