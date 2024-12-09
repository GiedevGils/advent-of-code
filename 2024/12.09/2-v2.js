const fs = require('fs')
const readline = require('readline')

const input = readline.createInterface({ input: fs.createReadStream('./input.txt') })

// this file does not work, it is just to document my attempts

/** @type {Array<string>} */
const diskmap = []

input.on('line', line => {
  let isFreeSpace = false
  let idx = 0
  line.split('').forEach((char) => {
    if (isFreeSpace) idx++
    for (let i = 0; i < Number(char); i++) {
      const char = isFreeSpace ? '.' : idx

      diskmap.push(char)
    }
    isFreeSpace = !isFreeSpace
  })
})

input.on('close', () => {
  console.time('total duration')
  console.timeLog('total duration', 'start')

  let currentEmptyFragmentSize = 0

  console.log(diskmap.join(''))

  let currentDiskFragment = []

  diskmap.forEach((x, idx) => {
    if (x === '.') {
      currentEmptyFragmentSize++
    }

    if (x !== '.') {
      const popped = diskmap.pop()
      currentDiskFragment.push(popped)

      // if we have an empty place to put it
      if (currentEmptyFragmentSize) {
        // we have a group, now iterate and check against the currentEmptyFragmentSize
        if (currentDiskFragment.at(0) !== popped) {
          console.log(currentDiskFragment)
          if (currentEmptyFragmentSize > currentDiskFragment.length) {
            diskmap.splice(idx - currentEmptyFragmentSize, currentDiskFragment.length, ...currentDiskFragment)
          }
          currentEmptyFragmentSize = currentEmptyFragmentSize - currentDiskFragment.length
          currentDiskFragment = []
        }
      }

      currentEmptyFragmentSize = 0
    }
  })

  console.log(diskmap.join(''))

  const result = diskmap.reduce((acc, curr, currIdx) => (acc += Number(curr) * currIdx), 0)

  // 8444425634594 too high
  console.log({ result })

  console.timeEnd('total duration', 'end')
})
