const fs = require('fs')
const readline = require('readline')

const input = readline.createInterface({ input: fs.createReadStream('./input.txt') })

const cards = []

input.on('line', line => {
  cards.push(line)
})

input.on('close', () => {
  const nrOfRunsPerCard = {}
  cards.forEach(_card => {
    nrOfRunsPerCard[_card] = 1
  })

  cards.forEach((_card, index) => {
    const [card, numbers] = _card.split(':')
    const [onCard, winning] = numbers.split('|')
    const nrsOnCard = onCard.split(' ').map(x => +x).filter(_ => _)
    const winningNrs = winning.split(' ').map(x => +x).filter(_ => _)

    for (let i = 0; i < nrOfRunsPerCard[_card]; i++) {
      let cardToRunExtra = index + 1
      nrsOnCard.forEach(nr => {
        if (winningNrs.includes(nr)) {
          nrOfRunsPerCard[cards[cardToRunExtra]] += 1
          cardToRunExtra++
        }
      })
    }
  })

  console.log(Object.values(nrOfRunsPerCard).reduce((a, b) => a + b))
})
