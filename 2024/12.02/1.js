const fs = require('fs')
const readline = require('readline')

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

module.exports = {
  isSafeReport
}

function isSafeReport (array) {
  let safe = true
  const isIncreasing = array[0] < array[1]
  array.forEach((currVal, idx) => {
    if (!safe) return
    if (idx === array.length - 1) return

    const nextVal = array[idx + 1]

    if ((currVal > nextVal && isIncreasing) || (currVal < nextVal && !isIncreasing)) {
      safe = false
      return
    }

    const diff = Math.abs(currVal - nextVal)

    if (diff < 1 || diff > 3) {
      safe = false
    }
  })
  return safe
}
