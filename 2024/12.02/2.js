const fs = require('fs')
const readline = require('readline')
const { isSafeReport } = require('./lib')

const input = readline.createInterface({ input: fs.createReadStream('./input.txt') })

const reports = []

input.on('line', line => {
  reports.push(line.split(' ').map(Number))
})

input.on('close', () => {
  let nrOfSafeReports = 0

  reports.forEach(report => {
    if (isSafeReport(report)) {
      nrOfSafeReports++
    } else {
      for (let i = 0; i < report.length; i++) {
        if (isSafeReport(report.toSpliced(i, 1))) {
          nrOfSafeReports++
          break
        }
      }
    }
  })

  // 584 too high
  // 554 too low
  // 862 incorrect
  // 559 incorrect
  // veel inspiratie opgedaan uit https://github.com/sk1talets/advent-of-code/blob/main/2024/2/script2.js
  console.log({ nrOfSafeReports })
})
