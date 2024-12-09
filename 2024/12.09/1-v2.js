const fs = require('fs')
const readline = require('readline')

const input = readline.createInterface({ input: fs.createReadStream('./input.txt') })

/** @type {Array<string>} */
const diskmap = []

input.on('line', line => {
  let isFreeSpace = false
  let idx = 0
  line.split('').forEach((char) => {
    if (isFreeSpace) idx++
    for (let i = 0; i < Number(char); i++) {
      const char = isFreeSpace ? '.' : idx

      diskmap.push(char)
    }
    isFreeSpace = !isFreeSpace
  })
})

input.on('close', () => {
  console.time('total duration')
  console.timeLog('total duration', 'start')

  diskmap.forEach((x, idx) => {
    if (x === '.') {
      let popped = diskmap.pop()

      while (popped === '.') {
        popped = diskmap.pop()
      }
      diskmap[idx] = popped
    }
  })

  const result = diskmap.reduce((acc, curr, currIdx) => (acc += Number(curr) * currIdx), 0)

  // 8444425634594 too high
  console.log({ result })

  console.timeEnd('total duration', 'end')
})
