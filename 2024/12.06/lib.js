module.exports = {
  findCursor,
  getNextDirection
}

function findCursor (grid) {
  let determinedPos = false
  let posX = -1
  let posY = -1

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

  if (posX === -1 && posY === -1) throw new Error('no cursor found')

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
