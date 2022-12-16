const fs = require('fs')

const dataURL = "./data/day-4.txt"

const rawData = fs.readFileSync(dataURL, "utf-8")

const data = rawData
  .split("\n")
  .map(group=>{
    const splitGroup = group.split(",")
    return splitGroup.map(range => range.split("-"))
  })
  .map(couplet =>{
    return couplet.map(single =>{
      return single.map(num=>parseInt(num))
    })
  })

let numIncludes = []
data.forEach(couplet=>{
  if(couplet[0][0]<=couplet[1][0] & couplet[0][1]>=couplet[1][1] | couplet[1][0]<=couplet[0][0] & couplet[1][1]>=couplet[0][1]){
      numIncludes.push(1)
  }
})

const answerPartOne = numIncludes.reduce((a,b)=>a+b,0)

// console.log(answerPartOne)

let overlapAtAll = [];
let loopStop = false;

data
  .map(couplet=>{
    return couplet.map(single =>{
      let arr = []
      for(let i = single[0]; i<=single[1]; i++){
        arr.push(i)
      }
      return arr
    })
  })
  .map(couplet=>{
    loopStop = false
    couplet[0].forEach(single=>{
      if(loopStop) return
      couplet[1].forEach(single2=>{
        if(single == single2){
          overlapAtAll.push(1)
          loopStop = true
        }
        if(loopStop) return
      })
    })
  })

const answerPartTwo = overlapAtAll.reduce((a,b)=>a+b,0)
  console.log(answerPartTwo)