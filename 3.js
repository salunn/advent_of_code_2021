const input = require('fs').readFileSync('./3_input').toString().split('\n').filter(a => !!a)

const getMoreCommonBitInPos = (input, pos) =>
  input.reduce((acc, cur) => {
    acc += Number(cur.split('')[pos])
    return acc
  }, 0) >= input.length / 2
    ? 1
    : 0

const getLessCommonBitInPos = (input, pos) =>
  input.reduce((acc, cur) => {
    acc += Number(cur.split('')[pos])
    return acc
  }, 0) >= input.length / 2
    ? 0
    : 1

function getCo2 (input) {
  let filteredInput = input
  for (let i = 0; i < input[0].length; i++) {
    if (filteredInput.length === 1) {
      break
    }
    const moreCommonBit = getLessCommonBitInPos(filteredInput, i)
    filteredInput = filteredInput.filter(item => Number(item.split('')[i]) === moreCommonBit)
  }

  return filteredInput[0]
}

function run (input) {
  const valueInPositions = input.reduce((acc, cur) => {
    cur.split('').forEach((val, idx) => {
      acc[idx] = acc[idx] ? acc[idx] + Number(val) : 0 + Number(val)
    })

    return acc
  }, {})

  const gamma = Object.entries(valueInPositions).map(([_, value]) => {
    return value > input.length / 2 ? '1' : '0'
  }).join('')

  const epsilon = gamma.split('').map(val => val === '1' ? '0' : '1').join('')
  console.log(`Part 1 solution: ${Number(`0b${gamma}`) * Number(`0b${epsilon}`)}`)
}

function part2 (input) {
  let filteredInput = input
  for (let i = 0; i < input[0].length; i++) {
    const moreCommonBit = getMoreCommonBitInPos(filteredInput, i)
    filteredInput = filteredInput.filter(item => Number(item.split('')[i]) === moreCommonBit)
  }
  const oxy = Number(`0b${filteredInput[0]}`)
  const co2 = Number(`0b${getCo2(input)}`)
  console.log(`Part 2 solution: ${oxy * co2}`)
}

run(input)
part2(input)
