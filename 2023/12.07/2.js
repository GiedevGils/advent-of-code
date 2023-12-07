const fs = require('fs')
const readline = require('readline')
const R = require('ramda')

const input = readline.createInterface({ input: fs.createReadStream('./input.txt') })

const cardStrength = ['A', 'K', 'Q', 'T', '9', '8', '7', '6', '5', '4', '3', '2', 'J']
const hands = []

const handPoints = []

input.on('line', line => {
  hands.push(line.split(' '))
})

input.on('close', () => {
  let total = 0
  hands.forEach(([hand, bid]) => {
    const points = calculateHandPoints(hand)
    handPoints.push({ hand, bid: +bid, points })
  })

  handPoints.sort((x, y) => y.points - x.points || (isFirstHandBest(x.hand, y.hand) ? -1 : 1))
  const reversed = R.reverse(handPoints)

  reversed.forEach((hand, index) => {
    total += hand.bid * (index + 1)
  })

  console.log(total)
})

function isFirstHandBest (hand1, hand2) {
  let isFirstHandBest = null

  for (let idx = 0; idx < hand1.length; idx++) {
    const letterh1 = hand1[idx]
    const letterh2 = hand2[idx]

    const ih1 = cardStrength.indexOf(letterh1)
    const ih2 = cardStrength.indexOf(letterh2)

    if (ih1 < ih2) {
      isFirstHandBest = true
      break
    }
    if (ih2 < ih1) {
      isFirstHandBest = false
      break
    }
  }

  return isFirstHandBest
}

/** @param {string} hand */
function calculateHandPoints (hand) {
  const handPoints = {}
  let points = 0

  const setPoints = newPoints => newPoints > points ? newPoints : points

  hand.split('').forEach(letter => {
    if (handPoints[letter]) handPoints[letter]++

    else handPoints[letter] = 1
  })

  if (!Object.keys(handPoints).includes('J')) { // if no joker, do usual stuff
    const _5 = isFiveOfAKind(hand)
    const _4 = isFourOfAKind(hand)
    const _fh = isFullHouse(hand)
    const _3 = isThreeOfAKind(hand)
    const _2 = isTwoPair(hand)
    const _1 = isOnePair(hand)

    if (_5) points = 7
    else if (_4) points = 6
    else if (_fh) points = 5
    else if (_3) points = 4
    else if (_2) points = 3
    else if (_1) points = 2
    else points = 1
  } else { // if there is a joker
    Object.entries(handPoints).forEach(([letter, occurences]) => {
      const jOccurences = handPoints.J
      if (letter === 'J' && occurences < 4) return

      if (
        occurences >= 4
      ) points = setPoints(7) // this means that there is a letter that occurs 4 times, so that means a 5 of a kind
      if (
        occurences === 3 && jOccurences === 1
      ) points = setPoints(6) // 3 of the same letter, joker makes it 4
      if (
        occurences === 3 && jOccurences === 2
      ) points = setPoints(7) // if 3 of the same letter, and 2 jokers, it makes 7
      if (
        occurences === 2 && jOccurences === 1 &&
        Object.entries(handPoints).filter(([_letter]) => _letter !== 'J' && letter !== _letter).length === 1
      ) points = setPoints(5) // 2 of the same letter, and 2 of another letter that is not J, measn a full house
      if (
        occurences === 2 && jOccurences === 1 &&
        Object.entries(handPoints).filter(([_letter]) => _letter !== 'J' && letter !== _letter).length !== 1
      ) points = setPoints(4) // joker can only make it 3 of a kind
      if (
        occurences === 2 && jOccurences === 2
      ) points = setPoints(6) // 2 + 2 = 4
      if (
        occurences === 2 && jOccurences === 3
      ) points = setPoints(7) // 3 + 2 = 5
      if (
        occurences === 1 && jOccurences === 1 &&
        Object.entries(handPoints).filter(([_letter]) => _letter !== 'J' && letter !== _letter).length === 3
      ) points = setPoints(2) // only a pair can be made out of this: 1 letter, 1 joker, and 3 other letters
      if (
        occurences === 1 && jOccurences === 1 &&
        Object.entries(handPoints).filter(([_letter]) => _letter !== 'J' && letter !== _letter).length === 2
      ) points = setPoints(3) // a two pair can be made out of this: 1 letter, 1 joker, and 2 other letters (which means 1 of those will have to have 2 occurences)
      if (
        occurences === 1 && jOccurences === 2
      ) points = setPoints(4) // 1 + 2 jokers will mean 3 of a kind
      if (
        occurences === 1 && jOccurences === 3
      ) points = setPoints(6) // 1 + 3 jokers will mean 4 of a kind
    })
  }

  return points
}

/** @param {string} input */
function isFiveOfAKind (input) {
  const cards = input.split('')
  return cards.every(x => x === cards[0])
}

/** @param {string} input */
function isFourOfAKind (input) {
  const cards = input.split('')
  let isFourOfAKind = false

  cards.forEach(c => {
    if (isFourOfAKind) return
    const sameCards = cards.filter(x => x === c)
    if (sameCards.length === 4) isFourOfAKind = true
  })

  return isFourOfAKind
}

/** @param {string} input */
function isFullHouse (input) {
  const cards = input.split('')
  const uniqCards = new Set(input)
  const _uniqCards = [...uniqCards]
  if (uniqCards.size === 2) {
    const filtered = cards.filter(x => x === _uniqCards[0])

    if (filtered.length === 3 || filtered.length === 2) return true
  }

  return false
}

/** @param {string} input */
function isThreeOfAKind (input) {
  const cards = input.split('')
  let isThreeOfAKind = false

  cards.forEach(c => {
    if (isThreeOfAKind) return
    const sameCards = cards.filter(x => x === c)
    if (sameCards.length === 3) isThreeOfAKind = true
  })

  return isThreeOfAKind
}

/** @param {string} input */
function isTwoPair (input) {
  const cards = input.split('')
  let isTwoPairOne = ''
  let isTwoPairTwo = ''

  cards.forEach(c => {
    if (!isTwoPairOne) {
      const sameCards = cards.filter(x => x === c)
      if (sameCards.length === 2) isTwoPairOne = c
    }

    if (!isTwoPairTwo && c !== isTwoPairOne) {
      const sameCards = cards.filter(x => x === c)
      if (sameCards.length === 2) isTwoPairTwo = c
    }
  })

  return !!isTwoPairOne && !!isTwoPairTwo
}

/** @param {string} input */
function isOnePair (input) {
  const cards = input.split('')
  let isOnePair = false

  cards.forEach(c => {
    if (isOnePair) return
    const sameCards = cards.filter(x => x === c)
    if (sameCards.length === 2) isOnePair = true
  })

  return isOnePair
}
