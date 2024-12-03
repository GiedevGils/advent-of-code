const fs = require('fs')
const readline = require('readline')

const input = readline.createInterface({ input: fs.createReadStream('./input.txt') })

let mem = ''

input.on('line', line => {
  mem += line
})

input.on('close', () => {
  const regexp = /(mul\(\d+,\d+\))|(don\'t\(\))|(do\(\))/g
  const groups = mem.matchAll(regexp)

  let total = 0
  let include = true

  for (const match of groups) {
    const expression = match[0]

    if(expression.includes('don')) {
      include = false
      continue
    }
    if (expression.includes('do')) {
      include = true
      continue
    }

    if(!include) continue

    console.log(expression)

    const digits = expression.matchAll(/(\d+)/g)
    
    const nrs = []

    for (const digit of digits) {
      nrs.push(Number(digit[1]))
    }

    const matchResult = nrs.reduce((prev, curr) => {
      return prev*curr
    },1)


    total+= matchResult
  }

  console.log(total)
})
