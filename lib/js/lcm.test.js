const { leastCommonMultiple, greatestCommonDivider } = require('./lcm')

describe('gcd', () => {
  it('works', () => {
    // 48 / 18 = 2 met rest 12
    // 18 / 12 = 1 met rest 6
    // 12 / 6 = 2 met rest 0
    // rest is nu 0, dus 6 is grootste gemeenschappelijke deler

    expect(greatestCommonDivider(42, 18)).toEqual(6)
  })
})

describe('lcm', () => {
  // 4: 4 8 12 16 20 24
  // 8: 8 16 24
  // beide hebben 24. Dat kan je delen door 2 zonder rest dus dan werkt het?

  it('works', () => {
    expect(leastCommonMultiple(4, 6)).toEqual(12)
  })
})
