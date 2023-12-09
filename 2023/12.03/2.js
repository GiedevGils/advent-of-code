const fs = require('fs')
const readline = require('readline')

const input = readline.createInterface({ input: fs.createReadStream('./input.txt') })

const schematic = []

input.on('line', line => {
  schematic.push(line)
})

input.on('close', () => {
  const gearRatios = []
  schematic.forEach((line, idx) => {
    const gearIndices = []

    const regex = /\*/gm
    let match

    while ((match = regex.exec(line)) !== null) {
      if (match.index) gearIndices.push(match.index)
    }

    gearIndices.forEach(gearIdx => {
      const linkedNumbers = []
      /** @type {RegExp} */
      const isNumRegex = /\d+/g
      let match = ''

      const [numbersAbove, numbersSameLine, numbersBelow] = [[], [], []]
      while ((match = isNumRegex.exec(line)) !== null) {
        numbersSameLine.push({ start: match.index, end: isNumRegex.lastIndex, number: +match[0] })
      }

      while ((match = isNumRegex.exec(schematic[idx - 1])) !== null) {
        numbersAbove.push({ start: match.index, end: isNumRegex.lastIndex, number: +match[0] })
      }

      while ((match = isNumRegex.exec(schematic[idx + 1])) !== null) {
        numbersBelow.push({ start: match.index, end: isNumRegex.lastIndex, number: +match[0] })
      }

      const numbers = [...numbersAbove, ...numbersSameLine, ...numbersBelow]

      numbers.forEach(({ start, end, number }) => {
        if (start - 1 <= gearIdx && gearIdx <= end) linkedNumbers.push(number)
      })

      if (linkedNumbers.length === 2) gearRatios.push(linkedNumbers[0] * linkedNumbers[1])
    })
  })

  console.log({ answer: gearRatios.reduce((p, c) => p + c) })
})
