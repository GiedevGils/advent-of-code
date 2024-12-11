const fs = require('fs')
const readline = require('readline')

const input = readline.createInterface({ input: fs.createReadStream('./input.txt') })

/** @type {Array<number>} */
let stones = []

input.on('line', line => {
  stones.push(...line.split(' ').map(Number))
})

input.on('close', () => {
  console.time('total duration')
  console.timeLog('total duration', 'start')

  const nrOfBlinks = 25

  for (let i = 0; i < nrOfBlinks; i++) {
    const stonesAfterBlink = []

    console.timeLog('total duration', i, stones.length)

    stones.forEach(stone => {
      const stoneNumberArray = stone.toString().split('')

      if (stone === 0) {
        stonesAfterBlink.push(1)
      } else if (stoneNumberArray.length % 2 === 0) {
        const mid = Math.ceil(stoneNumberArray.length / 2)

        const firstHalf = stoneNumberArray.slice(0, mid)
        const secondHalf = stoneNumberArray.slice(mid)

        stonesAfterBlink.push(Number(firstHalf.join('')))
        stonesAfterBlink.push(Number(secondHalf.join('')))
      } else {
        stonesAfterBlink.push(stone * 2024)
      }
    })

    stones = stonesAfterBlink
  }

  console.log({ nrOfStones: stones.length })

  console.timeEnd('total duration', 'end')
})
