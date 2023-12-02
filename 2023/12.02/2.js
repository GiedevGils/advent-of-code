const fs = require('fs')
const readline = require('readline')

const input = readline.createInterface({ input: fs.createReadStream('./input.txt') })
const powers = []

input.on('line', line => {
  const [game, cubes] = line.split(':')
  const highestNrOfCubesPerColor = {}

  cubes.trim()

  const cubeSets = cubes.split(';').map(x => x.trim())

  for (const cubeSet of cubeSets) {
    const cubesPerSet = cubeSet.split(',').map(x => x.trim())

    for (const cube of cubesPerSet) {
      const [nr, color] = cube.split(' ')

      if (+highestNrOfCubesPerColor[color] < nr || !highestNrOfCubesPerColor[color]) {
        highestNrOfCubesPerColor[color] = +nr
      }
    }
  }
  powers.push(Object.values(highestNrOfCubesPerColor).reduce((prev, curr) => prev * curr, 1))
})

input.on('close', () => {
  console.log(powers.reduce((prev, curr) => prev + curr, 0))
})
