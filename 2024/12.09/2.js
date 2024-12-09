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

  while (emptyItems.length) {
    const empty = emptyItems.shift()

    for (let i = 0; i < filledItems.length; i++) {
      const filled = filledItems[i]

      if (filled.isDone) continue

      if (filled.indices.length <= empty.indices.length) {
        if (filled.indices.at(0) < empty.indices.at(0)) continue

        const newIndices = empty.indices.splice(0, filled.indices.length)

        emptyItems.push({ indices: filled.indices })

        filled.indices = newIndices
        filled.isDone = true
      }
    }
  }

  const result = Object.values(diskmap.filter(x => !x.isFreeSpace)).reduce((acc, curr) => {
    const id = curr.id
    const totalIndicesTimesId = curr.indices.reduce((a, c) => {
      a += c * id

      return a
    }, 0)

    acc += totalIndicesTimesId

    return acc
  }, 0)

  // 8444425634594 too high
  console.log({ result })

  console.timeEnd('total duration', 'end')
})
