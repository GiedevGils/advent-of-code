const fs = require('fs')
const readline = require('readline')

const input = readline.createInterface({ input: fs.createReadStream('./input.txt') })

const lines = []

input.on('line', line => {
  const _line = line.split(' ').filter(_ => _)

  const [head, ...tail] = _line
  lines.push(tail.map(x => +x))
})

input.on('close', () => {
  const nrOfWaysToBeatRecord = []
  const [times, distances] = lines

  const time = +times.join('')
  const distance = +distances.join('')

  console.log({ time, distance })

  let nrOfWaysToBeatRecordForThisTime = 0
  for (let idx = 0; idx < time; idx++) {
    const raceDistance = idx * (time - idx)

    if (raceDistance > distance) {
      nrOfWaysToBeatRecordForThisTime++
    }
  }
  nrOfWaysToBeatRecord.push(nrOfWaysToBeatRecordForThisTime)

  console.log(nrOfWaysToBeatRecord.reduce((prev, curr) => prev * curr, 1))
})
