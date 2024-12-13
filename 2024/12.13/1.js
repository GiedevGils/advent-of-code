const fs = require('fs')
const readline = require('readline')

const input = readline.createInterface({ input: fs.createReadStream('./input.txt') })

const lines = []

input.on('line', line => {
  lines.push(line)
})

input.on('close', () => {
  console.time('total duration')
  console.timeLog('total duration', 'start')

  const input = parseInput(lines)

  const total = 0

  input.forEach(machine => {
    console.log(machine)
  })

  console.timeEnd('total duration', 'end')
})

function parseInput (lines) {
  let currentMachine = { buttons: {} }
  const inputs = []

  lines.forEach(line => {
    if (line.includes('+')) {
      let [btn, letter, x, y] = line.split(' ')
      x = x.split(',').at(0)
      x = +x.split('+').at(1)
      y = +y.split('+').at(1)

      currentMachine.buttons[letter.split(':').at(0)] = {
        x, y
      }
    }

    if (line.includes('Prize')) {
      const [prize, x, y] = line.split(' ')
      currentMachine.prize = {
        x: +x.split('=').at(1).split(',').at(0),
        y: +y.split('=').at(1)
      }
      inputs.push(currentMachine)
    }

    if (line === '') {
      currentMachine = { buttons: {} }
    }
  })

  return inputs
}
