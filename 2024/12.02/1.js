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

  reports.forEach((report) => {
    if (isSafeReport(report)) nrOfSafeReports++
  })

  // 530 too high
  console.log({ nrOfSafeReports })
})
