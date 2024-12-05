function makeIsSafeUpdate (order) {
  return function isSafeUpdate (update) {
    let safe = true

    for (const [index, nr] of update.entries()) {
      if (!safe) continue
      const hasToBeBefore = order[nr]

      const isLastItem = index - 1 === update.length

      if (!hasToBeBefore && isLastItem) safe = true
      if (!hasToBeBefore) continue

      const hasAfter = hasToBeBefore.some(x => {
        const idx = update.indexOf(x)

        if (idx === -1) return false

        return idx < index
      })

      if (hasAfter) safe = false
    }

    return safe
  }
}

module.exports = {
  makeIsSafeUpdate
}
