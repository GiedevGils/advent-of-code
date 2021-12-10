const input = require('./input')

// const input = [
//   'forward 5',
//   'down 5',
//   'forward 8',
//   'up 3',
//   'down 8',
//   'forward 2'
// ]

let hor = 0
let depth = 0

const forward = x => (hor + x)
const down = y => (depth + y)
const up = y => (depth - y)

input.forEach(command => {
  const [dir, amount] = command.split(' ')

  switch (dir) {
  case 'forward':
    hor = forward(+amount)
    break

  case 'down':
    depth = down(+amount)
    break

  case 'up':
    depth = up(+amount)
    break

  default:
    console.log('not found', { dir, amount })
    break
  }
})

console.log({ hor, depth, pos: hor * depth })
