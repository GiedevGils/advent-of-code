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
