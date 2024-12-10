
function makeArrayToCheck (surrounding) {
  return Object.entries(surrounding).filter(([key, { value }]) =>
    !!value &&
      ['below', 'above', 'left', 'right'].includes(key)
  ).map(([key, val]) => val)
}

module.exports = {
  makeArrayToCheck
}
