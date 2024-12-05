/** note: lcm & gcd */

/**
 * @param {number} a
 * @param {number} b
 */
const greatestCommonDivider = (a, b) => {
  if (b === 0) return a
  return greatestCommonDivider(b, a % b)
}

/**
 * @param {number} a
 * @param {number} b
 */
const leastCommonMultiple = (a, b) => {
  return (a * b) / greatestCommonDivider(a, b)
}

module.exports = {
  greatestCommonDivider, leastCommonMultiple
}
