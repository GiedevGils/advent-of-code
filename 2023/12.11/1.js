const fs = require('fs')
const readline = require('readline')

const input = readline.createInterface({ input: fs.createReadStream('./input.txt') })

const galaxy = []

input.on('line', line => {
  const _line = line.split('')
  galaxy.push(_line)
})

input.on('close', () => {
  const emptyRows = []
  const emptyColumns = []

  for (let i = 0; i < galaxy.length; i++) {
    const row = galaxy[i]
    if (row.every(x => x === '.')) emptyRows.push(i)
    if (getColumn(i).every(x => x === '.')) emptyColumns.push(i)
  }

  const expandedGalaxy = []

  galaxy.forEach((x, i) => {
    const galLine = []

    x.forEach((y, j) => {
      galLine.push(y)
      if (emptyColumns.includes(j)) galLine.push('.')
    })

    expandedGalaxy.push(galLine)
    if (emptyRows.includes(i)) expandedGalaxy.push(galLine)
  })

  const galaxyCoords = []

  expandedGalaxy.forEach((x, i) => {
    x.forEach((y, j) => {
      if (y === '#') galaxyCoords.push([i, j])
    })
  })

  const passedPaths = []
  let totalPathLength = 0
  let combos = 0

  for (const i1 in galaxyCoords) {
    for (const i2 in galaxyCoords) {
      if (passedPaths.includes(`${i1},${i2}`)) continue
      if (passedPaths.includes(`${i2},${i1}`)) continue
      if (i1 === i2) continue

      const g1 = galaxyCoords[i1]
      const g2 = galaxyCoords[i2]

      const [r, c] = g1
      const [x, y] = g2

      const diffX = Math.abs(x) - Math.abs(r)
      const diffY = Math.abs(y) - Math.abs(c)

      const diff = Math.abs(diffX) + Math.abs(diffY)

      totalPathLength += diff
      combos++
      passedPaths.push(`${i1},${i2}`)
    }
  }

  console.log({ answer: totalPathLength, combos })
})

function getColumn (index) {
  const columnNrs = []

  for (let i = 0; i < galaxy.length; i++) {
    columnNrs.push(galaxy[i][index])
  }

  return columnNrs
}
