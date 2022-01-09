const fs = require('fs')

const readToArray = file =>
  fs.readFileSync(file).toString().split('\n').filter(a => !!a)

function run (file) {
  const input = readToArray(file)
  const pos = input.reduce((acc, cur) => {
    const [direction, value] = cur.split(' ')
    const numVal = Number(value)
    if (direction === 'forward') {
      return {
        ...acc,
        position: acc.position + numVal
      }
    } else {
      return {
        ...acc,
        depth: acc.depth + (direction === 'up' ? -numVal : numVal)
      }
    }
  }, {
    position: 0,
    depth: 0
  })

  console.log(`Part 1 solution: ${pos.position * pos.depth}`)
}

function runWithAim (file) {
  const input = readToArray(file)

  const pos = input.reduce((acc, cur) => {
    const [direction, value] = cur.split(' ')
    const numVal = Number(value)
    if (direction !== 'forward') {
      return {
        ...acc,
        aim: acc.aim + (direction === 'up' ? -numVal : numVal)
      }
    } else {
      return {
        ...acc,
        position: acc.position + numVal,
        depth: acc.depth + (numVal * acc.aim)
      }
    }
  }, {
    position: 0,
    depth: 0,
    aim: 0
  })

  console.log(`Part 2 solution: ${pos.position * pos.depth}`)
}

run('./2_input')
runWithAim('./2_input')
