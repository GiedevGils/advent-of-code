const fs = require('fs')
const readline = require('readline')

const input = readline.createInterface({ input: fs.createReadStream('./input.txt') })

const criteria = {
  red: 12,
  green: 13,
  blue: 14
}

const possibleGames = new Set()

input.on('line', line => {
  const [game, cubes] = line.split(':')

  cubes.trim()

  const cubeSets = cubes.split(';').map(x => x.trim())

  try {
    for (const cubeSet of cubeSets) {
      const cubesPerSet = cubeSet.split(',').map(x => x.trim())
      for (const cube of cubesPerSet) {
        const [nr, color] = cube.split(' ')

        if (criteria[color] < nr) throw Error('nope')
        console.log({ nr, color })
      }
    }
    possibleGames.add(game)
  } catch {}
})

input.on('close', () => {
  const nr = [...possibleGames].reduce((nr, game) => nr + +game.split(' ')[1], 0)
  console.log(nr)
})
