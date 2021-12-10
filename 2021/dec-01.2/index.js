const input = require('../dec-01.1/input')
// const input = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263]

let counter = 0
let prevValue

for (let index = 0; index < input.length - 2; index++) {
  const value1 = input[index]
  const value2 = input[index + 1]
  const value3 = input[index + 2]

  const newValue = value1 + value2 + value3

  if (newValue > prevValue) { counter++ }
  prevValue = newValue
}

console.log({ counter })
