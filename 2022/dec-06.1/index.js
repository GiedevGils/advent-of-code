const fs = require('fs')
const readline = require('readline')

const input = readline.createInterface({ input: fs.createReadStream('./input.txt') })

let result = -1

input.on('line', line => {
  const characters = Array.from(line)
  characters.forEach((_, idx) => {
    if (result > -1) return
    const shouldBeUnique = characters.slice(idx, idx + 4)
    console.log({ idx, shouldBeUnique })
    const set = new Set(shouldBeUnique)

    if (set.size === 4) result = idx + 4
  })
})

input.on('close', () => {
  console.log({ result })
})
