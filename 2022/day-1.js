const fs = require("fs")

const dataURL = "data/day-1.txt"

let goal = 50;

const rawData = fs.readFileSync(dataURL, 'utf-8')

const data = rawData.split(/\n\s*\n/).map(line=>{
  const splitLine = line.split("\n")
  return splitLine.reduce((a, b)=>{
    return parseInt(a)+parseInt(b)
  }, 0)
})

//Part One

let answerOne = 0;

for(let i = 0; i<data.length; i++){
  if(answerOne<data[i]){
    answerOne=data[i]
  }
}

//console.log(answerOne)

let topThree = [0,0,0]

for(let i = 0; i<data.length; i++){
  if(topThree[0]<data[i] && topThree[0] <= topThree[1] && topThree[0]<=topThree[2]){
    topThree[0] = data[i]
  }else if(topThree[1]<data[i] && topThree[1] <= topThree[0] && topThree[1]<=topThree[2]){
    topThree[1] = data[i]
  }else if(topThree[2]<data[i] && topThree[2] <= topThree[1] && topThree[2]<=topThree[0]){
    topThree[2] = data[i]
  }
}



const answerTwo = topThree.reduce((a,b)=>{
  return a+b
}, 0)

console.log(answerTwo)
