function calculateNewValues (int) {
  const stoneNumberArray = int.toString().split('')

  let newValues

  if (int === 0) {
    newValues = [1]
  } else if (stoneNumberArray.length % 2 === 0) {
    const mid = Math.ceil(stoneNumberArray.length / 2)

    const firstHalf = stoneNumberArray.slice(0, mid)
    const secondHalf = stoneNumberArray.slice(mid)

    const newNr1 = Number(firstHalf.join(''))
    const newNr2 = Number(secondHalf.join(''))

    newValues = [newNr1, newNr2]
  } else {
    newValues = [int * 2024]
  }

  return newValues
}

module.exports = {
  calculateNewValues
}
