const fs = require('fs')
const readline = require('readline')

const input = readline.createInterface({ input: fs.createReadStream('./input.txt') })

const schematic = []
const numbers = []

input.on('line', line => {
  schematic.push(line)

  const nrs = line.split('').map(x => {
    if (x === '.') return '_'
    if (isSpecialCharacter(x)) return '_'
    return x
  }).join('').split('_').filter(_ => _)

  numbers.push(nrs)
})

input.on('close', () => {
  let added = 0
  const numbersThatWork = []

  numbers.forEach((element, idx) => {
    for (const number of element) {
      const firstIndex = schematic[idx].indexOf(number)
      const lastIndex = firstIndex + (number.length - 1)

      const charBeforestring = schematic[idx][firstIndex - 1]
      const charAfterString = schematic[idx][lastIndex + 1]

      if (isSpecialCharacter(charBeforestring) || isSpecialCharacter(charAfterString)) {
        added += +number
        numbersThatWork.push(+number)

        continue
      }

      const nrsToCheck = []

      for (let i = firstIndex - 1; i <= lastIndex + 1; i++) {
        nrsToCheck.push(i)
      }

      const lineBefore = schematic[idx - 1]
      const lineAfter = schematic[idx + 1]

      if (lineBefore) {
        for (const nrToCheck of nrsToCheck) {
          const char = lineBefore[nrToCheck]

          if (isSpecialCharacter(char)) {
            added += +number
            numbersThatWork.push(+number)

            break
          }
        }
      }

      if (lineAfter) {
        for (const nrToCheck of nrsToCheck) {
          const char = lineAfter[nrToCheck]
          if (isSpecialCharacter(char)) {
            added += +number
            numbersThatWork.push(+number)

            break
          }
        }
      }
    }
  })

  console.log({ added })
  console.log(numbersThatWork.at(15))
})

function isSpecialCharacter (str) {
  return '*$+-%#&=/@'.includes(str) /* eslint-disable-line */
}
