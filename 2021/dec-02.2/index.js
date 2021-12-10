const input = require('../dec-02.1/input')

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
let aim = 0

const forward = x => (hor + x)
const down = y => (aim + y)
const up = y => (aim - y)

input.forEach(command => {
  const [dir, amount] = command.split(' ')

  switch (dir) {
  case 'forward':
    hor = forward(+amount)
    depth += aim * +amount
    break

  case 'down':
    aim = down(+amount)
    break

  case 'up':
    aim = up(+amount)
    break

  default:
    console.log('not found', { dir, amount })
    break
  }
})

console.log({ hor, depth, pos: hor * depth })
