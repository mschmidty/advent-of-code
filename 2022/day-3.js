const fs = require("fs");

const dataURL = "./data/day-3.txt"
const rawData = fs.readFileSync(dataURL, 'utf-8')

const data = rawData
  .split("\n")
  .map(line=>line.split(''))

//Part One
const dataPartOne = data.map(line=>{
  const lineMidPoint = line.length/2;
  const compartmentOne = line.slice(0,lineMidPoint)
  const compartmentTwo = line.slice(lineMidPoint)
  return [compartmentOne, compartmentTwo]
})
//console.log(dataPartOne)

let alphabet = 'abcdefghijklmnopqrstuvwxyz';
let upperAndLower = [...alphabet, ...alphabet.toUpperCase()]

let alphabetValues = upperAndLower.reduce((object, cur, i) => {
  return {...object, [cur]:i+1}
}, {} )

let matchingLetters = []
let loopStop = false;
dataPartOne.forEach((sack, index)=>{
  loopStop = false
  // console.log(sack[0])
  sack[0].forEach(letterSackOne=>{
    if(loopStop) return
    sack[1].forEach(letterSackTwo =>{
      if (loopStop) return
      if(letterSackOne==letterSackTwo){
        matchingLetters.push(letterSackTwo)
        loopStop = true
      }
    })
  })
}) 

const answerPartOne = matchingLetters
  .map(letter=>alphabetValues[letter])
  .reduce((a,b)=>a+b,0)

//console.log(answerPartOne)

//PartTwo
let dataPartTwo = []

for(let i = 0; i<data.length; i=i+3){
  dataPartTwo.push(data.slice(i, i+3))
}

let commonLetters = [];

dataPartTwo.forEach(group=>{
  loopStop = false
  let tempCommonLetters = [];
  group[0].forEach(letter=>{
    group[1].forEach(letter2=>{
      if(letter==letter2){
        tempCommonLetters.push(letter);
      }
    })
  })
  tempCommonLetters.forEach(letter=>{
    if (loopStop) return
    group[2].forEach(letter2=>{
      if (loopStop) return
      if(letter == letter2){
        commonLetters.push(letter)
        loopStop = true
      }
    })
  })
})

const answerPartTwo = commonLetters
  .map(letter => alphabetValues[letter])
  .reduce((a,b)=>a+b,0)

console.log(answerPartTwo)






