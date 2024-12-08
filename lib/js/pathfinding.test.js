const { getManhattanDistance } = require('./pathfinding')

describe('getManhattanDistance', () => {
  it.each([
    [[1, 1], [1, 1], 0],
    [[5, 2], [0, 2], 4],
    [[2, 5], [0, 7], 1],
    [[7, 0], [5, 4], 3],
    [[6, 6], [3, 2], 3]
  ])('when coords are %s and %s, gets %s as result', (coord1, coord2, expected) => {
    expect(getManhattanDistance(coord1, coord2)).toEqual(expected)
  })
})
