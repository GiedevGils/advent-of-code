module.exports = {
  isSafeReport
}

function isSafeReport (array) {
  let safe = true
  const isIncreasing = array[0] < array[1]
  array.forEach((currVal, idx) => {
    if (!safe) return
    if (idx === array.length - 1) return

    const nextVal = array[idx + 1]

    if ((currVal > nextVal && isIncreasing) || (currVal < nextVal && !isIncreasing)) {
      safe = false
      return
    }

    const diff = Math.abs(currVal - nextVal)

    if (diff < 1 || diff > 3) {
      safe = false
    }
  })
  return safe
}
