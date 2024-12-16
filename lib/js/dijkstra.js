const { makeGridTraverser, createCoordinate } = require('./grid')

/**
 * @template T
 * @param {T[][]} grid
 * @param {T[]} blockerCharacters
 * @param {T[]} openCharacters
 * @param {T} start
 * @param {T} end
 */
function makeDijkstra (grid, blockerCharacters, openCharacters, start, end) {
  /** @type {string} */
  let startPos
  /** @type {string} */
  let endPos

  grid.forEach((row, x) => {
    row.forEach((cell, y) => {
      if (cell === start) {
        startPos = createCoordinate(x, y)
      }

      if (cell === end) {
        endPos = createCoordinate(x, y)
      }
    })
  })

  const graph = createGraph(grid, blockerCharacters, openCharacters)

  const distances = {}

  for (const node in graph) {
    distances[node] = Infinity
  }

  const visited = new Set()
  const queue = [{ node: startPos, distance: 0 }]

  while (queue.length) {
    queue.sort((a, b) => distances[a] - distances[b])
    const { node, distance: currentDistance } = queue.shift()

    if (visited.has(node)) {
      continue
    }
    visited.add(node)

    for (const [coords, distance] of Object.entries(graph[node])) {
      const newDistance = currentDistance + distance

      if (newDistance < distances[coords]) {
        distances[coords] = newDistance
        queue.push({ node: coords, distance: newDistance })
      }
    }
  }

  return distances
}

module.exports = { makeDijkstra }

/**
 * @template T
 * @param {T[][]} grid
 * @param {T[]} blockerCharacters
 * @param {T[]} openCharacters
 */
function createGraph (grid, blockerCharacters, openCharacters) {
  const { getDirectSurrounding, isValid } = makeGridTraverser(grid)

  const graph = {}

  grid.forEach((row, x) => {
    row.forEach((cell, y) => {
      if (blockerCharacters.includes(cell)) {
        return
      }

      const surrounding = Object.values(getDirectSurrounding(x, y))

      surrounding.forEach(({ newIdxX, newIdxY, value }) => {
        if (!isValid(newIdxX, newIdxY)) {
          return
        }

        if (blockerCharacters.includes(value)) {
          return
        }

        let currentNode = graph[createCoordinate(x, y)]

        if (!currentNode) {
          graph[createCoordinate(x, y)] = {}
          currentNode = graph[createCoordinate(x, y)]
        }

        currentNode[createCoordinate(newIdxX, newIdxY)] = 1
      })
    })
  })

  return graph
}
