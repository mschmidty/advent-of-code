const fs = require("fs")

// const dataURL = './day-2-test.txt'
const dataURL = './day-2.txt'

const dataRaw = fs.readFileSync(dataURL, "utf-8")

const data = dataRaw.split("\n")

const dataObjRaw = {};

//Clean Data

data.forEach(value=>{
  const valueArr = value.split(": ")
  const gameNumber = valueArr[0].split(" ")
  const bagPulls = valueArr[1].split("; ")
  bagPulls.forEach(pull=>{
    if(!dataObjRaw[gameNumber[1]]){
      [dataObjRaw[gameNumber[1]] = [pull]]
    }else{
      dataObjRaw[gameNumber[1]].push(pull)
    }
  })
})

const dataObj={}

for(let key in dataObjRaw){
  dataObj[key]=[]
  dataObjRaw[key].forEach((value, index)=>{
    const blocks = value.split(", ")
    dataObj[key].push({})
    blocks.forEach(block=>{
      const splitBlock = block.split(" ")
      dataObj[key][index][splitBlock[1]]=splitBlock[0]
    })
  })
}

// Part 1
const compareValues = {
  red: 12,
  green: 13, 
  blue: 14
}
let collectGames = []
for(let keyDataObj in dataObj){
  let count = 0;
  dataObj[keyDataObj].forEach(value=>{
    for(let keyValue in value){
      if(value[keyValue]>compareValues[keyValue]){
        count=count-1
      }
    }
    count++
  })
  if(count==dataObj[keyDataObj].length){
    collectGames.push(parseInt(keyDataObj))
  }
}
// console.log(collectGames.reduce((a,b)=>a+b, 0))

//Part two
let powerData = data.map(value=>{
  const allCubes = value.split(": ")[1]
  const cubesSplit = allCubes.split(/;\s|,\s/)
  // return cubesSplit
  let obj = {}
  cubesSplit.forEach(cube=>{
    const totalCube = cube.split(" ")
    if(!obj[totalCube[1]]){
      obj[totalCube[1]] = [totalCube[0]]
    }else{
      obj[totalCube[1]].push(totalCube[0])
    }
  })
  return obj
})

const power = powerData.map(arr=>{
  let minValues = []
  for(let key in arr){
    minValues.push(Math.max(...arr[key]))
  }
  return minValues.reduce((a,b)=>a*b,1)
})
console.log(power.reduce((a,b)=>a+b,0));