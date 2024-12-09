const fs = require('fs')
const readline = require('readline')

const input = readline.createInterface({ input: fs.createReadStream('./input.txt') })

/** @type {Record<string, {indices: array<number>, isFreeSpace: boolean}>} */
const diskmap = {}

input.on('line', line => {
  let isFreeSpace = false
  let currentIndex = 0
  line.split('').forEach((char, idx) => {
    for (let i = 0; i < Number(char); i++) {
      if (!diskmap[idx]) diskmap[idx] = { indices: [], isFreeSpace }

      diskmap[idx].indices.push(currentIndex)

      currentIndex++
    }
    isFreeSpace = !isFreeSpace
  })
})

input.on('close', () => {
  console.time('total duration')
  console.timeLog('total duration', 'start')

  console.log(diskmap)

  const emptyItems = Object.values(diskmap).filter((v) => v.isFreeSpace === true)
  const filledItems = Object.values(diskmap).filter((v) => v.isFreeSpace === false)

  for (let i = 0; i < filledItems.length; i++) {
    const item = filledItems[i]
    item.id = i
  }

  filledItems.reverse()

  filledItems.forEach(filled => {
    filled.oldIndices = filled.indices
    filled.indices = []

    let toBeTakenFrom = emptyItems.find(x => x.indices.length > 0)
    while (toBeTakenFrom && filled.oldIndices.length) {
      filled.oldIndices.pop()
      filled.indices.push(toBeTakenFrom.indices.pop())
      toBeTakenFrom = emptyItems.find(x => x.indices.length > 0)
    }

    filled.indices.push(...filled.oldIndices)

    delete filled.oldIncides
  })

  console.log('--')
  console.log(diskmap)

  console.timeEnd('total duration', 'end')
})
