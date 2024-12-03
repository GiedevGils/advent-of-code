const fs = require('fs')
const readline = require('readline')

const input = readline.createInterface({ input: fs.createReadStream('./input.txt') })

const reports = []

input.on('line', line => {
  reports.push(line.split(' ').map(Number))
})

input.on('close', () => {
  let nrOfSafeReports = 0

  reports.forEach(report => {
    const { safe } = report.reduce((object, curr) => {
      let { prev, safe, isIncreasing, prevSafe, isDampened } = object

      if (prev === null) return { ...object, prev: curr }

      if (isIncreasing === undefined && prev !== null) {
        if (prev < curr) isIncreasing = true
        else if (prev > curr) isIncreasing = false
      }
      const diff = Math.abs(prev - curr)

      if ((prev > curr && isIncreasing) || (prev < curr && !isIncreasing)) {
        safe = false
      }

      if (diff < 1 || diff > 3) {
        safe = false
      }

      if (!safe && isDampened) return { prev: undefined, safe: false, prevSafe: false, isDampened: true }
      if (!safe && !prevSafe) return { prev: undefined, safe: false, prevSafe: false, isDampened: undefined }

      if (safe === false && prevSafe === true && !isDampened) {
        return { safe: true, prev: prev, isIncreasing, prevSafe: false, isDampened: true }
      }

      return { safe, prevSafe: true, prev: curr, isIncreasing, isDampened }
    }, { prev: null, safe: true, isIncreasing: undefined, prevSafe: true, isDampened: false })

    if (!safe) console.log({ safe, report })

    if (safe) nrOfSafeReports++
  })

  // 584 too high
  // 554 too low
  // 862 incorrect
  // 559 incorrect
  console.log({ nrOfSafeReports })
})
