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

  const results = []

  input.forEach(machine => {
    const { buttons, prize } = machine

    const result = solveAdventPuzzle(prize.x, prize.y, buttons.A, buttons.B)

    if (result.cost !== Infinity) {
      results.push(result)
    }
  })

  console.log({ result: results.reduce((a, c) => (a += c.cost), 0) })
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

function solveAdventPuzzle (targetX, targetY, buttonA, buttonB) {
  const costA = 3 // Cost of pressing Button A
  const costB = 1 // Cost of pressing Button B

  let minCost = Infinity
  let bestA = 0
  let bestB = 0

  // Solve modular arithmetic to find possible b values
  const mod = buttonA.x // Modulus for solving
  const targetMod = targetX % mod

  for (let b = 0; b < 10000; b++) { // Search space for b, large enough to ensure we get solutions
    if ((buttonB.x * b) % mod === targetMod) {
      // Found a valid b, calculate corresponding a
      const a = (targetX - buttonB.x * b) / buttonA.x

      if (Number.isInteger(a) && a >= 0) {
        // Check if this (a, b) satisfies the second equation
        if (buttonA.y * a + buttonB.y * b === targetY) {
          const cost = costA * a + costB * b
          if (cost < minCost) {
            minCost = cost
            bestA = a
            bestB = b
          }
        }
      }
    }
  }

  return { a: bestA, b: bestB, cost: minCost }
}
