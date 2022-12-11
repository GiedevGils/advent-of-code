const fs = require('fs')
const readline = require('readline')

const input = readline.createInterface({ input: fs.createReadStream('./input.txt') })

let spriteLocation = 1
const commands = []
let cycle = 0
const cycleResults = []

let row = 0
const crt = {}

const addCycle = () => {
  if (cycle % 40 === 0) {
    row++
    crt[row] = ''
  }
  isSpriteCurrentlyVisible()

  cycle += 1
  if ([20, 60, 100, 140, 180, 220].includes(cycle)) {
    cycleResults.push(spriteLocation * cycle)
  }
}

const isSpriteCurrentlyVisible = () => {
  const currentLocationOnCrt = cycle % 40
  if (currentLocationOnCrt === spriteLocation - 1 || currentLocationOnCrt === spriteLocation || currentLocationOnCrt === spriteLocation + 1) {
    crt[row] += '#'
  } else {
    crt[row] += '.'
  }
}

input.on('line', line => {
  addCycle()

  const commandToEspriteLocationecute = commands.shift()

  if (commandToEspriteLocationecute !== undefined) {
    spriteLocation += commandToEspriteLocationecute
    addCycle()
  }

  const [command, value] = line.split(' ')

  if (command === 'addx') {
    commands.push(Number(value))
  }
})

input.on('close', () => {
  console.log('finished')
  console.log(crt)
})
