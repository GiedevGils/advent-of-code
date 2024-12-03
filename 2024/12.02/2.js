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
    console.log('-----')
    const { safe } = report.reduce((object, curr) => {
      let { prev, safe, isIncreasing, prevSafe } = object

      if (isIncreasing === undefined && prev !== null) {
        if (prev < curr) isIncreasing = true
        else if (prev > curr) isIncreasing = false
      }

      console.log({ curr, prev, safe, isIncreasing })

      if (!safe && !prevSafe) return { prev: undefined, safe: false, prevSafe: false }
      if (prev === null) return { ...object, prev: curr }

      const diff = Math.abs(prev - curr)

      if ((prev > curr && isIncreasing) || (prev < curr && !isIncreasing)) {
        safe = false
      }

      if (diff < 1 || diff > 3) {
        safe = false
      }

      if (safe === false && prevSafe === true) {
        return { safe: true, prev: prev, isIncreasing, prevSafe: false }
      }

      return { safe, prevSafe: true, prev: curr, isIncreasing }
    }, { prev: null, safe: true, isIncreasing: undefined })

    console.log({ safe })

    if (safe) nrOfSafeReports++
  })

  // 584 too high
  // 554 too low
  // 862 incorrect
  console.log({ nrOfSafeReports })
})
