const fs = require('fs')
const readline = require('readline')
const { makeGridTraverser } = require('../../lib/js')

const input = readline.createInterface({ input: fs.createReadStream('./input.txt') })

let grid = []
const movements = []

input.on('line', line => {
  if (line.includes('#')) grid.push(line.split(''))
  else if (line.includes('<')) movements.push(...line.split(''))
})

const { getSingle } = makeGridTraverser(grid)

input.on('close', () => {
  console.time('total duration')
  console.timeLog('total duration', 'start')

  expandGrid()

  console.table(grid)

  console.timeEnd('total duration', 'end')
})

function calculateCoords (grid) {
  let coords = 0

  grid.forEach((row, x) => {
    row.forEach((cell, y) => {
      if (cell === 'O') coords += x * 100 + y
    })
  })

  return coords
}

function expandGrid () {
  const newGrid = []

  grid.forEach((row, x) => {
    newGrid.push([])
    row.forEach((cell, y) => {
      if (cell === '#') newGrid[x].push('#', '#')
      if (cell === 'O') newGrid[x].push('[', ']')
      if (cell === '.') newGrid[x].push('.', '.')
      if (cell === '@') newGrid[x].push('@', '.')
    })
  })

  grid = newGrid
}

function completeGrid () {
  const robotpos = []

  grid.forEach((row, y) => {
    if (robotpos.length) return
    row.forEach((cell, x) => {
      if (cell === '@') robotpos.push(y, x)
    })
  })

  for (const dir of movements) {
    const direction = translateDirection(dir)
    const { newIdxX, newIdxY, value } = getSingle(direction)(robotpos[0], robotpos[1])

    if (value === '#') {
      // do nothing
    }
    if (value === '.') {
      grid[robotpos[0]][robotpos[1]] = '.'
      robotpos[0] = newIdxX
      robotpos[1] = newIdxY
      grid[robotpos[0]][robotpos[1]] = '@'
    }
    if (value === 'O') {
      const canPush = push(direction, newIdxX, newIdxY)
      if (canPush) {
        grid[robotpos[0]][robotpos[1]] = '.'
        robotpos[0] = newIdxX
        robotpos[1] = newIdxY
        grid[robotpos[0]][robotpos[1]] = '@'
      }
    }
  }
}

function push (direction, x, y) {
  const { newIdxX, newIdxY, value } = getSingle(direction)(x, y)

  const boxSide = grid[x][y]

  const boxPartnerCoords = []
  if (boxSide === '[') {
    boxPartnerCoords.push(x, y + 1)
  } else if (boxSide === ']') {
    boxPartnerCoords.push(x, y - 1)
  }

  if (value === 'O') {
    const canPush = push(direction, newIdxX, newIdxY)

    if (canPush) {
      grid[x][y] = '.'
      grid[newIdxX][newIdxY] = 'O'
      return true
    }
  }

  if (value === '.') {
    grid[newIdxX][newIdxY] = 'O'
    return true
  }

  if (value === '#') return false
}

function translateDirection (direction) {
  switch (direction) {
  case '^': return 'above'
  case 'v': return 'below'
  case '<': return 'left'
  case '>': return 'right'
  }
}
