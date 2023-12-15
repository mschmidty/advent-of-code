const fs = require("fs");

// const dataURL = "./day-3-test.txt"
const dataURL = "./day-3.txt"

const dataRaw = fs.readFileSync(dataURL, "utf-8")

let allNumbersAndIndexes = [];

const data = dataRaw.split("\n")
  .map(line=>[...line])
  .forEach((line, lineIndex)=>{
    let stagingNumbers =[];
    let startIndex = 0;
    let numberAndIndex = [];
    let symbolIndexes = []

    line.forEach((digit, digitIndex)=>{
      if(/[0-9]/.test(digit)){
        if(/[0-9]/.test(line[digitIndex-1])){
          stagingNumbers.push(digit)
          if(/[^0-9]/.test(line[digitIndex+1])){
            let completeNumber = stagingNumbers.join('');
            numberAndIndex.push([completeNumber, startIndex, digitIndex])
            stagingNumbers = []
          }
        }
        if(/[^0-9]/.test(line[digitIndex-1])){
          stagingNumbers.push(digit)
          startIndex=digitIndex
        }
      }
      if(/[^0-9.]/.test(line[digitIndex])){
        symbolIndexes.push(digitIndex)
      }
      if(/[0-9]/.test(digit) && /[^0-9]/.test(line[digitIndex-1]) && /[^0-9]/.test(line[digitIndex+1])){
        numberAndIndex.push([digit, digitIndex, digitIndex])
        stagingNumbers = []
      }
    })
    allNumbersAndIndexes.push([numberAndIndex, lineIndex, symbolIndexes, line.length])
  })

let finalNumbers = []
allNumbersAndIndexes.map(row=>{
  const rowNumbers = row[0]
  const rowIndex = row[1]
  const rowLength = row[3]
  for(let numbers of rowNumbers){

    const number = parseInt(numbers[0])
    const startIndex = numbers[1]==0 ? numbers[1] : numbers[1]-1
    const endIndex = numbers[2]+1;

    let currentRowCharIndexes = row[2];
    let previousRowCharIndexes = rowIndex!=0 ? allNumbersAndIndexes[rowIndex-1][2] : false;
    let nextRowCharIndexes = rowIndex!=allNumbersAndIndexes.length-1 ? allNumbersAndIndexes[rowIndex+1][2] : false;

    for(let i = 0; i<currentRowCharIndexes.length; i++){
      if(row[2][i]==startIndex || row[2][i]==endIndex){
        finalNumbers.push(number)
        break
      }
    }
    if(previousRowCharIndexes){
      for(let i = 0; i<previousRowCharIndexes.length; i++){
        if(previousRowCharIndexes[i]>=startIndex && previousRowCharIndexes[i]<=endIndex){
          finalNumbers.push(number)
          break
        }
      }
    }
    if(nextRowCharIndexes){
      for(let i = 0; i<nextRowCharIndexes.length; i++){
        if(nextRowCharIndexes[i]>=startIndex && nextRowCharIndexes[i]<=endIndex){
          finalNumbers.push(number)
          break
        }
      }
    }
  }
})



// console.log(finalNumbers.slice(400,600))
// console.log(finalNumbers.reduce((a,b)=>a+b,0))

//Part two 
let gearIndexes = []
dataRaw.split("\n")
  .map(line=>[...line])
  .forEach((line, lineIndex)=>{
    line.forEach((digit, digitIndex)=>{
      if(/[\*]/.test(digit)){
        gearIndexes.push([digitIndex, lineIndex])
      }
    })
    
  })

// console.log(dataRaw)
// console.log(gearIndexes)

// allNumbersAndIndexes[[[[number, startIndex, endIndex][...]], lineNumber][...]]
const gearRatios = gearIndexes.map(gearLoc=>{
  const sameLineNumbers = allNumbersAndIndexes[gearLoc[1]][0]
  const previousLineNumbers = gearLoc[1]!=0 ? allNumbersAndIndexes[gearLoc[1]-1][0] : false
  const nextLineNumbers = gearLoc[1]!=allNumbersAndIndexes.length-1 ? allNumbersAndIndexes[gearLoc[1]+1][0] : false
  const gearLocStartIndex = gearLoc[0]-1
  const gearLocEndIndex = gearLoc[0]+1

  let collectGearNumbers = []
  sameLineNumbers.forEach(numberSet=>{
    const number = parseInt(numberSet[0])
    const numberStartIndex = numberSet[1]
    const numberEndIndex = numberSet[2]
    if(numberEndIndex == gearLocStartIndex || numberStartIndex==gearLocEndIndex){
      collectGearNumbers.push(number)
    }
  })

  previousLineNumbers.forEach(numberSet=>{
    const number = parseInt(numberSet[0])
    const numberStartIndex = numberSet[1]
    const numberEndIndex = numberSet[2]
    if(numberEndIndex >= gearLocStartIndex && numberStartIndex<=gearLocEndIndex){
      collectGearNumbers.push(number)
    }
  })

    nextLineNumbers.forEach(numberSet=>{
      const number = parseInt(numberSet[0])
      const numberStartIndex = numberSet[1]
      const numberEndIndex = numberSet[2]

      if(numberEndIndex >= gearLocStartIndex && numberStartIndex<=gearLocEndIndex ){
        collectGearNumbers.push(number)
      }
    })
  return(collectGearNumbers)
})
.filter(arr =>arr.length===2)
.map(arr=>arr.reduce((a,b)=>a*b,1))
.reduce((a,b)=>a+b,0)

console.log(gearRatios);

