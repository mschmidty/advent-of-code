const fs = require('fs');

const testURL = "datasets/day-5-test.txt"
const datURL = "datasets/day-5.txt"

const rawDat = fs.readFileSync(datURL, 'utf-8')

const dat = rawDat.split('\n').map(coords=>{
  return coords.split(" -> ").map(coord=>{
    return coord.split(",").map(a=>parseInt(a))
  })
})

const datStLines = dat.filter(a=>{
  return a[0][0] == a[1][0] || a[0][1] == a[1][1]
})
const partTwoLines = dat.filter(a=>{
  return a[0][0] == a[1][0] || a[0][1] == a[1][1] || Math.abs((a[0][0]-a[1][0])/(a[0][1]-a[1][1])) == 1
})



const xMax = dat.map(coordSet=>{
  const xCoords = [coordSet[0][0], coordSet[1][0]]
  const xSort = xCoords.sort((a,b)=>a-b)
  return xSort[1]
}).sort((a,b)=>a-b)[dat.length-1]

const yMax = dat.map(coordSet=>{
  const yCoords = [coordSet[0][0], coordSet[1][0]]
  const ySort = yCoords.sort((a,b)=>a-b)
  return ySort[1]
}).sort((a,b)=>a-b)[dat.length-1]

const boardDim = {xMax, yMax}

const board = []
for(let i = 0; i<=boardDim.yMax+1; i++){
  let row = []
  for(let j = 0; j<=boardDim.xMax+1; j++){
    row.push(0)
  }
  board.push(row)
}

//false y = the same = horizontal Line
//true x = the same

//for false
//1 find the value of y;

//for true
// 1 find the value of x
// find the max and min of y

// const markedBoard = markAllLines(board, datStLines)

// const greaterThanTwo = markedBoard.map(row=>{
//   return row.filter(a=>a>1)
// })

// const answerPartOne = calcAnswer(greaterThanTwo)
// console.log("Answer Part One: " + answerPartOne)
//console.table(board)
const partTwoMarkedLines = markAllLines(board, partTwoLines)
console.log(calcAnswer(partTwoMarkedLines))
//console.log("Answer Part Two: " + calcAnswer(partTwoMarkedLines))

function calcAnswer(board){
  const pGreaterThanOne= board.map(row=>{
    return row.filter(a=>a>1)
  })
  const onlyFullArrays = pGreaterThanOne.filter(a=>a.length>0)
  const normalized = onlyFullArrays.map(array=>{
    const normal = array.map(a=>a/a)
    return normal.reduce((a,b)=>a+b)
  })
  return normalized
  normalized.reduce((a,b)=>a+b)
}

function markAllLines(board, allCoords){
  let markedBoard=board;
  for(let i = 0; i<allCoords.length; i++){
    markedBoard = markLines2(markedBoard, allCoords[i])
  }
  return markedBoard
}

function markLines2(board, coords){
  if(isVert(coords)){
    return vMarkLine(board, coords)
  }else if(isDiag(coords)){
    return dMarkLine(board, coords)
  }
  else{
    const y = coords[0][1]
    const lineToBeMarked = board[y]
    const xCoordsSorted = [coords[0][0],coords[1][0]].sort((a,b)=>a-b)
    const newLine = hMarkLine(lineToBeMarked, xCoordsSorted)
    board[y]=newLine
    return board
  }
}

function markLines(board, coords){
  if(isVert(coords)){
    return vMarkLine(board, coords)
  }else{
    const y = coords[0][1]
    const lineToBeMarked = board[y]
    const xCoordsSorted = [coords[0][0],coords[1][0]].sort((a,b)=>a-b)
    const newLine = hMarkLine(lineToBeMarked, xCoordsSorted)
    board[y]=newLine
    return board
  }
}
function vMarkLine(board, coords){
  const xCoord = coords[0][0]
  const yCoordsSorted = [coords[0][1],coords[1][1]].sort((a,b)=>a-b)
  let newBoard = board;

  for(let i = yCoordsSorted[0]; i<=yCoordsSorted[1]; i++){
    newBoard[i][xCoord] +=  1
  }
  return newBoard
}
function hMarkLine(line, coords){
  let newLine = line
  for(i=coords[0]; i<=coords[1];i++){
    newLine[i] = newLine[i]+1
  }
  return newLine
}

function dMarkLine(board, coords){
  const sortedCoords = firstIsLowest(coords)
  let newBoard = board
  let j = sortedCoords[0][1]
  if(yDirectionNeg(sortedCoords)){
    for(let i = sortedCoords[0][0]; i<=sortedCoords[1][0]; i++){
      newBoard[i][j] += 1
      j++
    }
  }else{
    for(let i = sortedCoords[0][0]; i<=sortedCoords[1][0]; i++){
      newBoard[i][j] += 1
      j--
    }
  }

  return newBoard;
}

function isVert(coord){
  if(coord[0][0]==coord[1][0]){
    return true
  }
  return false
}
function isHor(coord){
  if(coord[0][1]==coord[1][1]){
    return true
  }
  return false
}

function isDiag(coord){
  if(Math.abs((coord[0][0]-coord[1][0])/(coord[0][1]-coord[1][1])) == 1){
    return true
  }
  return false
}

function firstIsLowest(coords){
  if(coords[0][0]>coords[1][0]){
    return [coords[1], coords[0]]
  }
  return coords
}

function yDirectionNeg(coords){
  if(coords[0][1]<coords[1][1]){
    return true
  }
  return false
}

