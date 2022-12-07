const fs = require('fs')
const readline = require('readline')

const input = readline.createInterface({ input: fs.createReadStream('./input.txt') })

let currentFilePath = ''
const filesystem = {}

input.on('line', line => {
  if (line.startsWith('$')) {
    if (line.includes('cd')) {
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
    }
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
    parentDirs.shift()

    parentDirs.reduce((previous, current) => {
      fsMeta[previous] += size

      return previous + `/${current}`
    }, '')
  })

  const result = Object.values(fsMeta).reduce((total, amount) => amount <= 100000 ? total + amount : total, 0)

  console.log('finished', { result })
})
