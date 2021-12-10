// const input = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263]
const input = require('./input')
let times = 0

for (const index in input) {
  const value = input[index]
  const previousValue = input[index - 1]

  if (value > previousValue) {
    times++
  }
}

console.log(times)
