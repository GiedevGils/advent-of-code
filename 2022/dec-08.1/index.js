const fs = require('fs')
const readline = require('readline')

const input = readline.createInterface({ input: fs.createReadStream('./input.txt') })

/**
 * @type {Array<Array>}
 */
const trees = []

const getYAxisTrees = index => {
  return trees.map(row => row[index])
}
const comparison = currentTreeHeight => treeHeighToCompareTo => {
  const visible = currentTreeHeight > treeHeighToCompareTo
  return visible
}

input.on('line', line => {
  trees.push(line.split('').map(x => +x))
})

input.on('close', () => {
  let nrOfTreesVisible = 0
  // loop only over inner trees, that's why starting at 1
  for (let y = 1; y < trees.length - 1; y++) {
    const treeRow = trees[y]
    const rowLength = treeRow.length

    for (let x = 1; x < rowLength - 1; x++) {
      // assume tree is visible unless hidden
      const currentTreeHeight = treeRow[x]
      const yAxisTrees = getYAxisTrees(x)
      const compareFunc = comparison(currentTreeHeight)

      const treesAbove = [...yAxisTrees].splice(0, y)
      const treesBelow = [...yAxisTrees].splice(y + 1)
      const treesLeft = [...treeRow].splice(0, x)
      const treesRight = [...treeRow].splice(x + 1)

      if (
        treesLeft.every(compareFunc) ||
        treesRight.every(compareFunc) ||
        treesBelow.every(compareFunc) ||
        treesAbove.every(compareFunc)
      ) {
        nrOfTreesVisible++
      }
    }
  }

  nrOfTreesVisible += trees.length * 2 // outside y
  nrOfTreesVisible += trees[0].length * 2 // outside x
  nrOfTreesVisible -= 4 // remove duplicates on the corners that were counted twice above

  console.log('finished')
  console.log({ nrOfTreesVisible })
})
