const fs = require('fs')
const readline = require('readline')

const input = readline.createInterface({ input: fs.createReadStream('./input.txt') })

let result = -1

input.on('line', line => {
  const characters = Array.from(line)
  characters.forEach((_, idx) => {
    if (result > -1) return
    const shouldBeUnique = characters.slice(idx, idx + 14)
    const set = new Set(shouldBeUnique)

    if (set.size === 14) result = idx + 14
  })
})

input.on('close', () => {
  console.log({ result })
})
