const { makeGridTraverser } = require('./grid')

// This test is based on Advent of Code 2024 Day 2
// https://adventofcode.com/2024/day/4

const grid = [
  /*        0    1    2    3    4    5    6    7    8    0   */
  /* 0 */ ['M', 'M', 'M', 'S', 'X', 'X', 'M', 'A', 'S', 'M'],
  /* 1 */ ['M', 'S', 'A', 'M', 'X', 'M', 'S', 'M', 'S', 'A'],
  /* 2 */ ['A', 'M', 'X', 'S', 'X', 'M', 'A', 'A', 'M', 'M'],
  /* 3 */ ['M', 'S', 'A', 'M', 'A', 'S', 'M', 'S', 'M', 'X'],
  /* 4 */ ['X', 'M', 'A', 'S', 'A', 'M', 'X', 'A', 'M', 'M'],
  /* 5 */ ['X', 'X', 'A', 'M', 'M', 'X', 'X', 'A', 'M', 'A'],
  /* 6 */ ['S', 'M', 'S', 'M', 'S', 'A', 'S', 'X', 'S', 'S'],
  /* 7 */ ['S', 'A', 'X', 'A', 'M', 'A', 'S', 'A', 'A', 'A'],
  /* 8 */ ['M', 'A', 'M', 'M', 'M', 'X', 'M', 'M', 'M', 'M'],
  /* 9 */ ['M', 'X', 'M', 'X', 'A', 'X', 'M', 'A', 'S', 'X']
]

describe('grid traverser', () => {
  const {
    getSingle,
    getAll,
    getSurrounding,
    getDirectSurrounding,
    isAdjacent
  } = makeGridTraverser(grid)

  describe('getSingle', () => {
    it('above', () => {
      const { value, newIdxX, newIdxY } = getSingle('above')(5, 3)

      expect(value).toEqual('S')
      expect(newIdxX).toEqual(4)
      expect(newIdxY).toEqual(3)
    })

    it('below left', () => {
      const { value, newIdxX, newIdxY } = getSingle('belowLeft')(5, 3)

      expect(value).toEqual('S')
      expect(newIdxX).toEqual(6)
      expect(newIdxY).toEqual(2)
    })
  })

  describe('getAll', () => {
    it('gets below', () => {
      const values = getAll('below')(5, 0)

      expect(values).toEqual([
        { value: 'S', x: 6, y: 0 },
        { value: 'S', x: 7, y: 0 },
        { value: 'M', x: 8, y: 0 },
        { value: 'M', x: 9, y: 0 }])
    })

    it('gets below right', () => {
      const values = getAll('belowRight')(5, 0)

      expect(values).toEqual([
        { value: 'M', x: 6, y: 1 },
        { value: 'X', x: 7, y: 2 },
        { value: 'M', x: 8, y: 3 },
        { value: 'A', x: 9, y: 4 }
      ])
    })

    it('returns empty array when no values to the side', () => {
      const values = getAll('left')(5, 0)

      expect(values).toEqual([])
    })
  })

  describe('getSurrounding', () => {
    it('gets surrounding', () => {
      const result = getSurrounding(5, 3)

      expect(result).toEqual({
        aboveLeft: { value: 'A', newIdxX: 4, newIdxY: 2 },
        above: { value: 'S', newIdxX: 4, newIdxY: 3 },
        aboveRight: { value: 'A', newIdxX: 4, newIdxY: 4 },
        left: { value: 'A', newIdxX: 5, newIdxY: 2 },
        right: { value: 'M', newIdxX: 5, newIdxY: 4 },
        belowLeft: { value: 'S', newIdxX: 6, newIdxY: 2 },
        below: { value: 'M', newIdxX: 6, newIdxY: 3 },
        belowRight: { value: 'S', newIdxX: 6, newIdxY: 4 }
      })
    })
  })

  describe('getDirectSurrounding', () => {
    it('gets direct surrounding', () => {
      const result = getDirectSurrounding(5, 3)

      expect(result).toEqual({
        above: { value: 'S', newIdxX: 4, newIdxY: 3 },
        left: { value: 'A', newIdxX: 5, newIdxY: 2 },
        right: { value: 'M', newIdxX: 5, newIdxY: 4 },
        below: { value: 'M', newIdxX: 6, newIdxY: 3 }
      })
    })
  })

  describe('isAdjacent', () => {
    it('is adjacent', () => {
      const result = isAdjacent([5, 3], [5, 2])

      expect(result).toEqual(true)
    })

    it('is diagonal adjacent', () => {
      const result = isAdjacent([5, 3], [6, 2])

      expect(result).toEqual(true)
    })

    it('is diagonal adjacent', () => {
      const result = isAdjacent([4, 3], [6, 3])

      expect(result).toEqual(false)
    })
  })

  describe('isDirectAdjacent', () => {
    it('is adjacent', () => {
      const result = isAdjacent([5, 3], [6, 3])

      expect(result).toEqual(true)
    })

    it('is diagonal adjacent', () => {
      const result = isAdjacent([5, 3], [6, 2])

      expect(result).toEqual(true)
    })
  })
})
