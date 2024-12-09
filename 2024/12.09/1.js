const fs = require('fs')
const readline = require('readline')

const input = readline.createInterface({ input: fs.createReadStream('./input.txt') })

/** @type {Array<{indices: array<number>, isFreeSpace: boolean, id: number}>} */
const diskmap = []

input.on('line', line => {
  let isFreeSpace = false
  let currentIndex = 0
  let idx = 0
  line.split('').forEach((char) => {
    for (let i = 0; i < Number(char); i++) {
      if (!diskmap[idx]) diskmap[idx] = { indices: [], isFreeSpace }

      diskmap[idx].indices.push(currentIndex)

      currentIndex++
    }
    isFreeSpace = !isFreeSpace
    if (Number(char) > 0) {
      idx++
    }
  })
})

input.on('close', () => {
  console.time('total duration')
  console.timeLog('total duration', 'start')

  const emptyItems = diskmap.filter((v) => v.isFreeSpace === true)
  const filledItems = diskmap.filter((v) => v.isFreeSpace === false)

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
      const currentIndex = filled.oldIndices.pop()
      const toBeTakenIndex = toBeTakenFrom.indices.shift()

      if (toBeTakenIndex < currentIndex) {
        filled.indices.push(toBeTakenIndex)
      } else {
        filled.indices.push(currentIndex)
      }

      toBeTakenFrom = emptyItems.find(x => x.indices.length > 0)
    }

    filled.indices.push(...filled.oldIndices)

    delete filled.oldIndices
    delete filled.isFreeSpace
  })

  const result = Object.values(diskmap).reduce((acc, curr) => {
    const id = curr.id
    const totalIndicesTimesId = curr.indices.reduce((a, c) => {
      a += c * id
      return a
    }, 0)
    acc += totalIndicesTimesId

    return acc
  }, 0)

  console.log({ result })

  console.timeEnd('total duration', 'end')
})
