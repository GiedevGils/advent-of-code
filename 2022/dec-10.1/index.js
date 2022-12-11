const fs = require('fs')
const readline = require('readline')

const input = readline.createInterface({ input: fs.createReadStream('./input.txt') })

let x = 1
const commands = []
let cycle = 0
const cycleResults = []

const addCycle = () => {
  cycle += 1
  if ([20, 60, 100, 140, 180, 220].includes(cycle)) {
    cycleResults.push(x * cycle)
    console.log({ cycle, x })
  }
}

input.on('line', line => {
  addCycle()
  const commandToExecute = commands.shift()

  if (commandToExecute !== undefined) {
    x += commandToExecute
    addCycle()
  }

  const [command, value] = line.split(' ')

  if (command === 'addx') {
    commands.push(Number(value))
  }
})

input.on('close', () => {
  const result = cycleResults.reduce((total, amount) => total + amount, 0)
  console.log('finished', { result, cycle })
})
