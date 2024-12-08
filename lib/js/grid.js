/** note: grid traversal */

const directions = {
  above: { dx: -1, dy: 0 }, // Above
  below: { dx: 1, dy: 0 }, // Below
  left: { dx: 0, dy: -1 }, // Left
  right: { dx: 0, dy: 1 }, // Right
  aboveLeft: { dx: -1, dy: -1 }, // above-left
  aboveRight: { dx: -1, dy: 1 }, // above-right
  belowLeft: { dx: 1, dy: -1 }, // below-left
  belowRight: { dx: 1, dy: 1 } // below-right
}

/**
 * @description Create a function that
 * @param {Array<Array<any>>} grid
 */
function makeGridTraverser (grid) {
  /** @type {(direction: keyof directions) => (idxX: number, idxY: number) => {value: any, newIdxX:number, newIdxY:number}} */
  const getSingle = (direction) => (idxX, idxY) => {
    const iX = idxX + directions[direction].dx
    const iY = idxY + directions[direction].dy

    if (!isValid(iX, iY)) return { value: undefined, newIdxX: iX, newIdxY: iY }

    return { value: grid[iX][iY], newIdxX: iX, newIdxY: iY }
  }

  /** @type {(direction: keyof directions) => (idxX: number, idxY: number) => Array<any>} */
  const getAll = (direction) => (idxX, idxY) => {
    if (!isValid(idxX, idxY)) return []

    const { value, newIdxX, newIdxY } = getSingle(direction)(idxX, idxY)

    const values = []

    if (value) {
      values.push({ value, x: newIdxX, y: newIdxY })
    }

    if (isValid(newIdxX, newIdxY)) {
      const newval = getAll(direction)(newIdxX, newIdxY)

      if (newval) values.push(...newval)
    }

    return values
  }

  const getSurrounding = (idxX, idxY) => {
    const result = {}

    Object.keys(directions).forEach(direction => {
      result[direction] = getSingle(direction)(idxX, idxY).value
    })

    return result
  }

  return {
    getSingle,
    getAll,
    getSurrounding,
    isValid
  }

  function isValid (x, y) {
    return x >= 0 && x < grid.length && y >= 0 && y < grid[0].length
  }
}

module.exports = {
  makeGridTraverser
}
