const fs = require('fs')
const readline = require('readline')

const input = readline.createInterface({ input: fs.createReadStream('./input.txt') })

const stackHolder = []
const stacks = {}
let stacksMade = false

const fillStacks = () => {
  stackHolder.forEach(line => {
    const boxes = line.match(/.{1,4}|./g).map(x => x.trim())
    boxes.forEach((box, idx) => {
      const stack = idx + 1
      if (box) stacks[stack]?.length ? stacks[stack].unshift(box) : stacks[stack] = [box]
    })
  })

  stacksMade = true
}

input.on('line', line => {
  const nr = +(line.replaceAll(' ', ''))
  if (!stacksMade && isNaN(nr)) stackHolder.push(line)
  if (!stacksMade && !isNaN(nr)) fillStacks()

  const [/**/, amount, /**/, from, /**/, to] = line.split(' ')
  if (!amount || !from || !to) return

  const boxes = stacks[from]?.splice(stacks[from].length - amount, amount)
  boxes && stacks[to].push(...boxes)
})

input.on('close', () => {
  console.log(Object.values(stacks).map(x => x.pop()?.replaceAll('[', '').replaceAll(']', '')).join(''))
})
