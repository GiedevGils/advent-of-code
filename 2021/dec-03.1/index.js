const input = require('./input')
const res = {}

// const input = [
//   '00100',
//   '11110',
//   '10110',
//   '10111',
//   '10101',
//   '01111',
//   '00111',
//   '11100',
//   '10000',
//   '11001',
//   '00010',
//   '01010'
// ]

/**
 * @param {String} string the string to invert
 * @returns the inverted string
 */
const invertString = string => string.replaceAll('0', '2').replaceAll('1', '0').replaceAll('2', '1')

input.forEach(ray => {
  for (let idx = 0; idx < ray.length; idx++) {
    const number = ray[idx]

    if (!res[idx]) res[idx] = [0, 0]

    res[idx][number]++
  }
})

let resString = ''

Object.values(res).forEach(x => {
  const [zero, one] = x

  if (zero > one) {
    resString += '0'
  } else {
    resString += '1'
  }
})

const decimalGamma = parseInt(resString, 2)
const decimalEpsilon = parseInt(invertString(resString), 2)

console.log({ result: decimalGamma * decimalEpsilon })
