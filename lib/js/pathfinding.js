function getManhattanDistance ([x1, y1], [x2, y2]) {
  // minus 1 excludes endpoint
  const distance = Math.max(Math.abs(x2 - x1), Math.abs(y2 - y1)) - 1

  if (distance < 0) return 0

  return distance
}

module.exports = {
  getManhattanDistance
}
