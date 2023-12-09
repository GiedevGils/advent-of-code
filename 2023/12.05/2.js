const fs = require('fs')
const readline = require('readline')

const input = readline.createInterface({ input: fs.createReadStream('./input.txt') })

const almenac = []

input.on('line', line => {
  almenac.push(line)
})

input.on('close', () => {
  let seeds = []

  const maps = {}

  let currentMap = ''

  almenac.forEach((line, idx) => {
    if (!line) return

    if (idx === 0) {
      const [head, ...tail] = line.split(' ')
      seeds = tail.map(x => +x)

      return
    }

    if (line.includes('map:')) {
      currentMap = line.split(' ')[0]
      return
    }

    if (!maps[currentMap]) maps[currentMap] = []

    maps[currentMap].push(line.split(' ').map(x => +x))
  })

  const result = []
  const ranges = {}

  Object.keys(maps).forEach((_map, mapIdx) => {
    const map = maps[_map]
    ranges[_map] = []
    map.forEach(v => {
      const [destStart, sourceStart, rangeLength] = v

      const destEnd = destStart + (rangeLength - 1)
      const sourceEnd = sourceStart + (rangeLength - 1)

      ranges[_map].push({ destStart, destEnd, sourceStart, sourceEnd })
    })
  })

  let numbers = seeds

  console.log(numbers)

  Object.keys(ranges).forEach((_range) => {
    const _ranges = ranges[_range]
    const newNumbers = []

    const numbersToRun = []
    const [firstNr, firstRange, secondNr, secondRange] = numbers

    for (let idx = firstNr; idx < firstNr + firstRange; idx++) {
      numbersToRun.push(idx)
    }

    for (let idx = secondNr; idx < secondNr + secondRange; idx++) {
      numbersToRun.push(idx)
    }

    numbersToRun.forEach((nr, nrIndex) => {
      for (let rangeIdx = 0; rangeIdx < _ranges.length; rangeIdx++) {
        const range = _ranges[rangeIdx]

        const { destStart, destEnd, sourceStart, sourceEnd } = range

        let correspondingSoilNumber = 0
        if (sourceStart <= nr && nr <= sourceEnd) {
          const diffFromEnd = sourceEnd - nr
          correspondingSoilNumber = destEnd - diffFromEnd

          newNumbers[nrIndex] = correspondingSoilNumber

          break
        } else {
          newNumbers[nrIndex] = nr
        }
      }
    })
    numbers = newNumbers
  })

  console.log({ answer: numbers.reduce((p, c) => p > c ? c : p, 0) })
})
