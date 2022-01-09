const fs = require('fs')

function mapToBingoTables (input) {
  return input.filter(l => l.trim() !== '')
    .reduce((result, line, index) => {
      const numbersPerLine = 5
      const tableNumber = Math.floor(index / numbersPerLine)

      if (!result[tableNumber]) {
        result[tableNumber] = []
      }

      result[tableNumber].push(line.split(' ').filter(i => i !== ''))

      return result
    }, [])
}

const removeNumFromTable = (num, table) =>
  table.map(row =>
    row.map(n =>
      n === num ? 'X' : n
    )
  )

function containsFiveOfSame (arr) {
  const foundNumbers = arr.reduce((res, cur) => {
    if (res[cur]) {
      res[cur] = res[cur] + 1
    } else {
      res[cur] = 1
    }
    return res
  }, {})
  return Object.values(foundNumbers).some(n => n === 5)
}

function everyRowHasXInSameIndex (table) {
  const indexNumbersWithX = table.flatMap(row =>
    row.map((num, idx) =>
      num === 'X' ? idx : null
    ).filter(i => !!i))
  return containsFiveOfSame(indexNumbersWithX)
}

function tablesWithBingo (tables) {
  const res = tables.filter(tableNowHasBingo)

  return res.length > 0 ? res : []
}

function tableNowHasBingo (table) {
  return table.some(row => row.every(v => v === 'X')) ||
    everyRowHasXInSameIndex(table)
}

function sumOfNumbersLeft (table) {
  return table.reduce((sum, row) => {
    return sum + row.reduce((rowSum, n) => n !== 'X' ? rowSum + Number(n) : rowSum, 0)
  }, 0)
}

function runPart1 () {
  const input = fs.readFileSync('./4_input', 'utf-8').split(/\r?\n/)
  const numbersDrawn = input.shift().split(',')
  let tables = mapToBingoTables(input)

  for (let idx = 0; idx < numbersDrawn.length; idx++) {
    const num = numbersDrawn[idx]
    tables = tables.map(table => removeNumFromTable(num, table))
    const firstBingo = tablesWithBingo(tables)[0]
    if (firstBingo) {
      console.log(sumOfNumbersLeft(firstBingo) * num)
      break
    }
  }
}

function runPart2 () {
  const input = fs.readFileSync('./4_input', 'utf-8').split(/\r?\n/)
  const numbersDrawn = input.shift().split(',')
  const tables = mapToBingoTables(input)
  const bingosAlreadyFound = []

  numbersDrawn.forEach(num => {
    tables.forEach((table, tableIdx) => {
      tables[tableIdx] = removeNumFromTable(num, table)

      if (tableNowHasBingo(tables[tableIdx])) {
        bingosAlreadyFound.push({ table: tables[tableIdx], num })
        tables.splice(tableIdx, 1, [])
      }
    })
  })

  const lastWin = bingosAlreadyFound.reverse().shift()
  console.log(sumOfNumbersLeft(lastWin.table) * Number(lastWin.num))
}

runPart1()
runPart2()
