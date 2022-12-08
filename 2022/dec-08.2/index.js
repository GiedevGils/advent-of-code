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

input.on('line', line => {
  trees.push(line.split('').map(x => +x))
})

const getPointsForTreeAxis = (trees, scores, currentTreeHeight) => {
  let skip = false

  if (trees.length === 0) return

  trees.forEach((tree, idx) => {
    if (skip) return
    if (currentTreeHeight === tree || !trees[idx + 1]) {
      scores.push(idx + 1)
      skip = true
    } else if (currentTreeHeight < tree) {
      skip = true
    }
  })
}

input.on('close', () => {
  const scoreMap = []

  // loop only over inner trees, that's why starting at 1
  for (let y = 1; y < trees.length - 1; y++) {
    const treeRow = trees[y]
    const rowLength = treeRow.length
    scoreMap.push([])

    for (let x = 1; x < rowLength - 1; x++) {
      const currentTreeHeight = treeRow[x]
      const yAxisTrees = getYAxisTrees(x)
      const treeScores = []

      // reverse above and left to 'see' it from the perspective of the current tree
      const treesAbove = [...yAxisTrees].splice(0, y).reverse()
      const treesBelow = [...yAxisTrees].splice(y + 1)
      const treesLeft = [...treeRow].splice(0, x).reverse()
      const treesRight = [...treeRow].splice(x + 1)

      getPointsForTreeAxis(treesAbove, treeScores, currentTreeHeight)
      getPointsForTreeAxis(treesBelow, treeScores, currentTreeHeight)
      getPointsForTreeAxis(treesLeft, treeScores, currentTreeHeight)
      getPointsForTreeAxis(treesRight, treeScores, currentTreeHeight)

      const treeScore = treeScores.reduce((total, amount) => total * amount, 1)
      scoreMap[y - 1][x - 1] = treeScore
    }
  }

  const highestScore = scoreMap.reduce((highest, subtrees) => {
    const highestOfRow = subtrees.reduce((highest, tree) => tree > highest ? tree : highest, -1)
    return highestOfRow > highest ? highestOfRow : highest
  }, -1)

  fs.writeFileSync('scoreMap.txt', JSON.stringify(scoreMap))

  console.log('finished')
  console.log({ highestScore })
})
