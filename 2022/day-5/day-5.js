const fs = require('fs')

const dataURL = "day-5/day-5.txt"

const rawData = fs.readFileSync(dataURL, 'utf-8');

const data = rawData.split("\n\n")

const crates = data[0].split("\n")
const rows = crates[crates.length-1].trim().split("  ").map(item =>item.trim())
const cratesPosition = crates.splice(0, crates.length - 1)

const cratesPositionParse = cratesPosition.map(boxes=>{
  let returnedBoxes = []
  boxes.split('').forEach((value, index) =>{
    if(index % 4 == 1){
      returnedBoxes.push(value)
    }
  })
  return returnedBoxes
})
.slice()
.reverse()

const arrangedBoxes = []

let initiatedBoxes = rows.reduce((obj,cur,i)=>{
    return {...obj, [cur]:[]}
}, {})

for(let i = 0; i < rows.length; i++){
  for(let j = 0; j<cratesPositionParse.length; j++){
    if(cratesPositionParse[j][i]!=" "){
      initiatedBoxes[rows[i]].push(cratesPositionParse[j][i])
    }
  }
}


const finalBoxesStart = initiatedBoxes

const moves = data[1].split("\n").map(singleMove => {
  const singleMoveArr = singleMove.split(" ")
  return {
    [singleMoveArr[0]]:parseInt(singleMoveArr[1]),
    [singleMoveArr[2]]:parseInt(singleMoveArr[3]),
    [singleMoveArr[4]]:parseInt(singleMoveArr[5]),
  }
})
console.log(finalBoxesStart)
const cratesPositionFinalPartOne = finalBoxesStart
const cratesPositionFinalPartTwo = JSON.parse(JSON.stringify(finalBoxesStart))

console.log(cratesPositionFinalPartOne)
moves.forEach(move=>{
  for(let i = 0; i<move.move;i++){
    const crateToMove = cratesPositionFinalPartOne[move.from].pop()
    cratesPositionFinalPartOne[move.to].push(crateToMove)
  }
})
let answerPartOne = ""

Object.values(cratesPositionFinalPartOne).forEach(crate=>{
  const crateToPush = crate.pop()
  answerPartOne+=crateToPush
})

console.log(answerPartOne)


moves.forEach(move=>{
  let cratesToMove = []
  for(let i = 0; i<move.move;i++){
    const crateToMovePartTwo = cratesPositionFinalPartTwo[move.from].pop()
    cratesToMove.push(crateToMovePartTwo)
  }
  cratesToMove.reverse()
  cratesPositionFinalPartTwo[move.to].push(...cratesToMove)
})

console.log(cratesPositionFinalPartTwo)

let answerPartTwo = ""

Object.values(cratesPositionFinalPartTwo).forEach(crate=>{
  const crateToPush = crate.pop()
  answerPartTwo+=crateToPush
})

console.log(answerPartTwo)