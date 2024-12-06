module.exports = {
  findCursor,
  getNextDirection
}

function findCursor (grid) {
  let determinedPos = false
  let posX = 0
  let posY = 0

  grid.forEach((line, idxX) => {
    if (determinedPos) return
    line.forEach((char, idxY) => {
      if (determinedPos) return
      if (char === '^') {
        posX = idxX
        posY = idxY
        determinedPos = true
      }
    })
  })

  return { posX, posY }
}

const dirs = {
  right: 'below',
  below: 'left',
  left: 'above',
  above: 'right'
}

/** @param {keyof dirs} dir */
function getNextDirection (dir) {
  return dirs[dir]
}
