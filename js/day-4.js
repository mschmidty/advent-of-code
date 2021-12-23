const fs = require('fs')

// Parse data
const urlTestDat = './datasets/day-4-test.txt'
const urlDat = './datasets/day-4.txt'

const rawData = fs.readFileSync(urlDat, 'utf-8')
const dat = parseData(rawData)

// Part 1
let finalBoards=[];
for(let i = 0; i<dat.numbers.length; i++){
  if(i==0){
    finalBoards = [oneBingoRun(dat.boards, dat.numbers[i]), dat.numbers[i]]
  }
  finalBoards = [oneBingoRun(finalBoards[0], dat.numbers[i]), dat.numbers[i]]
  const bingoBoards = finalBoards[0].map(board=>{
    return board.isBingo
  })
  const numberOfBingo = bingoBoards.reduce((a,b)=>a+b)
  if(numberOfBingo>0){
    break
  }
}
const partOneBoard = finalBoards[0].filter(board=>board.isBingo>0)[0]
console.log("Part 1 Answer: " + calcBoard(partOneBoard) * parseInt(finalBoards[1]))



//Part 2
let finalBoards2;
for(let i = 0; i<dat.numbers.length; i++){
  //console.log("iteration: " + i)
  if(i==0){
    finalBoards2 = [oneBingoRun(dat.boards, dat.numbers[i]), dat.numbers[i]]
  }
  finalBoards2 = [oneBingoRun(finalBoards2[0], dat.numbers[i]), dat.numbers[i]]
  const bingoBoards = finalBoards2[0].map(board=>{
    return board.isBingo
  })
  const numberOfBingo = bingoBoards.reduce((a,b)=>a+b)
  //console.log(numberOfBingo)
  
  if(numberOfBingo==dat.boards.length){
    break
  }
}
const finalBoardPartTwo = finalBoards2[0].sort((a,b)=>{
  return a.count-b.count
})[finalBoards2[0].length-1]

console.log("Part 2 Answer: " +calcBoard(finalBoardPartTwo)*parseInt(finalBoards2[1]));






// Functions
function parseData(data){
  const parseNewLine = data.split('\n\n')
  const numbers = parseNewLine[0].split(',');
  const unParsedBoards = parseNewLine.slice(1).map(board =>{
    return board.split('\n')   
  })
  let boards = unParsedBoards.map(board =>{
    const boardParsedLines = board.map(line=>{
      const splitLines = line.split(/[\s]+/)
      return splitLines.filter(Boolean);
    })
    return boardParsedLines.map(line=>{
      return line.map(item => [item, 0])
    })
  })
  boards = boards.map((board, index)=>{
    const boardNumber = index+1;
    const isBingo = 0;
    const count = 0;
    return {board,boardNumber, isBingo, count}
  })
  return {numbers, boards}
}
// This function takes in all of the parsed boards and a number that is picked and marks all of the numbers on all of the boards as a 1.
function markBingoNumbers(boards, testNumber){
  return boards.map(board =>{
    const newBoard = board.board.map(lines=>{
      return lines.map(item=>{
        if(item[0]==testNumber){
          item[1]=1;
          return item
        }else{
          return item
        }
      })
    })
    board.board = newBoard
    board.boardDown = reshape(newBoard)
    return board
  })
}
// Reshapes a board so that columns can be counted as rows. 
function reshape(board){
  let reshaped = [];
  for(let i = 0; i < board.length; i++){
    for(let j = 0; j < board[i].length; j++){ 
      if(i<1){
        reshaped.push([board[i][j]])
      }else{
        reshaped[j].push(board[i][j])
      }
    }
  }
  return reshaped
}

// This function sums all "marked" bingo numbers for rows. 
function sumLine(allBoards){
  return allBoards.map(board=>{
    const summedLineAcross =  board.board.map(line=>{
      const counts = line.map(cell=> cell[1])
      return counts.reduce((a,b)=>a+b)
    })
    const summedLineDown =  board.boardDown.map(line=>{
      const counts = line.map(cell=> cell[1])
      return counts.reduce((a,b)=>a+b)
    })

    board.summedLineAccross = summedLineAcross
    board.summedLineDown = summedLineDown
    
    return board
  })

}
// This function loops through sumed lines for the sumline function and returns bingo if there is a line that totals to 5. 
function testBingo(boardsTest){
  return boardsTest.map(board=>{
    // console.log(board.board)
    // console.log("is Bingo: " + board.isBingo)
    if(board.isBingo==0){
      const resultAccross = board.summedLineAccross.filter(sum=>sum==5)
      const resultDown = board.summedLineDown.filter(sum=>sum==5)
      board.count= board.count +1
      if(resultAccross.length>0 || resultDown.length>0){
        board.isBingo = 1
        return board
      }else{
        return board
      }
    }else{
      return board;
    }
    
  })
}
// This takes in all of the baords that have been marked and then returns if there is bingo on a board or not yet. 

function oneBingoRun(boards, number){
  const testBoard = markBingoNumbers(boards, number)
  const summedLines = sumLine(testBoard)
  const testedBingo = testBingo(summedLines)
  return testedBingo
}

//Calculate the value of the board. 
function calcBoard(board){
  const boardSum = board.board.map(line=>{
    const parsedLines = line.map(item=>{
      if(item[1]==0){
        return parseInt(item[0])
      }else{
        return 0
      }
    })
    return parsedLines.reduce((a,b)=>{
      return a+b
    })
  }).reduce((a,b)=>{
    return a+b
  })
  return boardSum
}

