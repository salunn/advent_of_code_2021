const input = require('./1_input')

function part1 () {
  console.log(`Part 1 solution: ${
    input.filter((val, idx) => {
      return idx >= 1 && val > input[idx - 1]
    }).length}
  `)
}

function part2 () {
  const windows = input
    .map((_, idx) => {
      if (idx <= input.length - 3) {
        return input.slice(idx, idx + 3)
      }
      return null
    })
    .filter(a => !!a)
    .map(windows => windows.reduce((sum, val) => sum + val, 0))
    .filter((val, idx, list) =>
      idx >= 1 && val > list[idx - 1]
    )
  console.log(`Part 2 solution: ${windows.length}`)
}

part1()
part2()
