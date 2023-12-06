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
  let nrOfWaysToBeatRecord = []
  const [times, distances] = lines

  times.forEach((time, timeIdx) => {
    let nrOfWaysToBeatRecordForThisTime = 0
    for (let idx = 0; idx < time; idx++) {
      
      const distance = idx * (time-idx)

      if(distance > distances[timeIdx]) {
        nrOfWaysToBeatRecordForThisTime++
      }
    }
    nrOfWaysToBeatRecord.push(nrOfWaysToBeatRecordForThisTime)
  })

  console.log(nrOfWaysToBeatRecord.reduce((prev, curr) => prev*curr, 1))

})
