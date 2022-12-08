const fs = require('fs')
const readline = require('readline')

const input = readline.createInterface({ input: fs.createReadStream('./input.txt') })

let currentFilePath = ''
const filesystem = {}

input.on('line', line => {
  if (line.startsWith('$ cd')) {
    if (line.includes('..')) {
      const fullPath = currentFilePath.split('/')
      fullPath.pop()
      currentFilePath = fullPath.join('/')
    } else if (line.includes('/')) currentFilePath = ''
    else {
      const newdir = line.split(' ')[2]
      currentFilePath += `/${newdir}`
    }

    if (!filesystem[currentFilePath]) filesystem[currentFilePath] = {}
  } else {
    if (!isNaN(+line.at(0))) filesystem[currentFilePath][line.split(' ')[1]] = +line.split(' ')[0]
  }
})

input.on('close', () => {
  const fsMeta = {}
  Object.entries(filesystem).forEach(([key, val]) => {
    fsMeta[key] = Object.values(val).reduce((total, amount) => total + amount, 0)
  })

  Object.entries(fsMeta).forEach(([dir, size]) => {
    const parentDirs = dir.split('/')
    parentDirs.shift() // first character is empty, because it starts with a /. remove that empty char as it is irrelevant
    parentDirs.reduce((previous, current) => {
      fsMeta[previous] += size

      return previous + `/${current}`
    }, '')
  })

  const potentialDirs = []

  const GOAL_SPACE = 30000000
  const usedSpace = fsMeta['']
  const toBeFreed = usedSpace - GOAL_SPACE

  console.log({ usedSpace, GOAL_SPACE, toBeFreed })

  console.log(fsMeta)

  Object.entries(fsMeta).forEach(([name, size]) => {
    if (size >= toBeFreed) {
      console.log(`deletion candidate: ${name || 'root'} at size ${size}`)
      potentialDirs.push(size)
    }
  })

  console.log('finished', { result: potentialDirs.sort((x, y) => x - y) })
})
