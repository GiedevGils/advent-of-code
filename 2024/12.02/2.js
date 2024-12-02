const fs = require('fs')
const readline = require('readline')

const input = readline.createInterface({ input: fs.createReadStream('./input.txt') })

const reports = []

input.on('line', line => {
  reports.push(line.split(' ').map(Number))
})


input.on('close', () => {
  let nrOfSafeReports = 0

  const reps = {}

  reports.forEach((report, idx) => {

    reps[idx] = {
      array: report,
      isIncreasing: report[0] < report[1],
      isDampened: false
    }    
  })

  Object.values(reps).forEach(({array, isIncreasing}, idx) => {
    let safe = true

    array.forEach((currVal, idx) => {
      if(!safe) return
      if(idx === array.length - 1) return
      
      const nextVal = array[idx + 1]
      const dampenedVal = array[idx + 2]
      
      if((currVal > nextVal && isIncreasing) || (currVal < nextVal && !isIncreasing)) {
        if((currVal > dampenedVal && isIncreasing) || (currVal < dampenedVal && !isIncreasing)) {
          safe = false
          return
        }
      }

      const diff = Math.abs(currVal - nextVal)
      const dampenedDiff = Math.abs(currVal - dampenedVal)

      if((diff < 1 || diff > 3) && (dampenedDiff < 1 || dampenedDiff > 3)) {
        safe = false
      }

      if(safe && idx === array.length - 2) nrOfSafeReports++
    })
  })

  // 584 too high
  console.log(nrOfSafeReports)
})
