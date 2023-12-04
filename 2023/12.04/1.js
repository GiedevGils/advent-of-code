const fs = require('fs')
const readline = require('readline')

const input = readline.createInterface({ input: fs.createReadStream('./input.txt') })

const points = {}

input.on('line', line => {
  const [card, numbers] = line.split(':')

  points[card] = 0

  const [onCard, winning] = numbers.split('|')
  const nrsOnCard = onCard.split(' ').map(x => +x).filter(_ => _)
  const winningNrs = winning.split(' ').map(x => +x).filter(_ => _)

  for (const nr of nrsOnCard) {
    if (winningNrs.includes(nr)) {
      if (!points[card]) {
        points[card] = 1
        continue
      }
      points[card] = points[card] * 2
    }
  }
})

input.on('close', () => {
  console.log(Object.values(points).reduce((prev, curr) => prev + curr, 0))
})
