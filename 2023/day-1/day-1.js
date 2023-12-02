const fs = require("fs")

// const dataURL = './day-1-test-data.txt'
// const dataURL = './day-1-test-data-2.txt'
const dataURL = './day-1-data.txt'

const dataRaw = fs.readFileSync(dataURL, 'utf-8')

const data = dataRaw.split('\n')

//Part 1
const numbers = data.map(value => {
  return value.replace(/\D/g, "")
})

const finalValuePartOne = numbers.map(value=>{
  return Number(value[0]+value[value.length-1])
}).reduce((a,b)=>a+b,0)

// console.log(finalValuePartOne)

//Part 2
let valueLookup = [
  ["one","1"],
  ["two","2"],
  ["three", "3"],
  ["four", "4"],
  ["five","5"],
  ["six", "6"],
  ["seven", "7"],
  ["eight", "8"],
  ["nine","9"]
]


const replaceStringNumbers = data.map(value=>{
  let detectedNumbers=[];
  for(let i = 0; i<valueLookup.length; i++){
    const replaceKey = findAlphaNumbers(value, valueLookup[i][0], valueLookup[i][1])
    if(replaceKey.length>0){
      detectedNumbers.push(replaceKey)
    }
    
  }
  for(let i = 0; i<detectedNumbers.length; i++){
    for(let j=0; j<detectedNumbers[i].length; j++){
      value=buildNew(value, detectedNumbers[i][j][0], detectedNumbers[i][j][1])
    }    
  }
  return value
})

console.log(solveMain(replaceStringNumbers))

//SolveMain solves the main part of thepuzzle for both parts one and two.  It takes your parsed data removes all characters and ruturns only numbers and then takes the first and last number concatenates them then adds all the numbers together. 
function solveMain(data){
  const numbers = data.map(value => {
    return value.replace(/\D/g, "")
  })

  const finalValue = numbers.map(value=>{
    return Number(value[0]+value[value.length-1])
  }).reduce((a,b)=>a+b,0)

  return finalValue
}

// buildNew takes in a string and then replaces a single digit of that string with a string at the index. 
function buildNew(stringThatNeedsReplacing, indexOfValueBeingReplaced, valueToInput){
  return [...stringThatNeedsReplacing].map((value, i)=>{
    if(i==indexOfValueBeingReplaced){
      return valueToInput
    }
    else {
      return value
    }
  }).join('')
}

//find AlphaNumbers takes in a string and a written out number and detects all instances of that alpha numeric number and returns the an aray of the index of the start of that number and the actual digit of that number. 
function findAlphaNumbers(string, alphaNumbers, numericNum){
  const alphaArr = [...alphaNumbers]
  const stringArr = [...string]
  let inputValues = [];
  for(let i = 0; i < string.length; i++){
    if(alphaArr[0] == stringArr[i]){
      let letterArr = [alphaArr[0]]
      for(let j = 1; j < alphaArr.length; j++){
        if(alphaArr[j]==stringArr[i+j]){
          letterArr.push(alphaArr[j])
        }
        if(letterArr.length == alphaArr.length){
          inputValues.push([i, numericNum])
        }
      }
    }
  }
  return inputValues;
}

const testStr = "seven4ljsevenfive"

// console.log(findAlphaNumbers(testStr, "seven", 7))

