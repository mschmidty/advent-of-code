const fs = require("fs");

// const dataURL = "./day-5-test.txt"
const dataURL = "./day-5.txt"

const dataRaw = fs.readFileSync(dataURL, 'utf-8').split(/\n\s*\n/)
.map(line=>{
  const splitLines = line.split(/\:\s|\:/)
  // let mapNames = splitLines[0].split("-to-")
  // if(mapNames[1]){
  //   const toAndMap = mapNames[1].split(" ")
  //   mapNames = [mapNames[0], toAndMap[0], toAndMap[1]]
  // }
  const numberList = splitLines[1].split("\n").map(numbers=>numbers.split(" ").map(number=>+number))
  return numberList
})
// console.log(dataRaw)



const seeds = dataRaw[0]
const maps = dataRaw.slice(1, dataRaw.length)

const allMaps = maps.map(maps=>{
    return makeMaps(maps)
})


const potentialAnswers = seeds[0].map(seed=>{
  let number;
  for(let i = 0; i<allMaps.length; i++){
    for(let j = 0; j<allMaps[i][0].length;j++){
      if(allMaps[i][0][j]==seed && i==0){
        number = allMaps[i][1][j]
        break
      }
      if(allMaps[i][0][j]===number){
        number = allMaps[i][1][j]
        break
      }
    }
  }
  return number
})

console.log(potentialAnswers)


//[destination, source, range]
//seed-to-soil = [soil, seed, range]

function makeMaps(arrOfNumbers){
  arrOfNumbers.sort((a,b)=>a[1]-b[1])
  const availableMaps = arrOfNumbers.map(mapSet=>{
    let returnArr = [[],[]]
    for(let i=0; i<mapSet[2]; i++){
      returnArr[0].push(mapSet[1]+i)
      returnArr[1].push(mapSet[0]+i)
    }
    return returnArr
  })
  let mappings = [[],[]];
  availableMaps.forEach((seq, index)=>{
    const lastEl = seq[0][seq[0].length-1]
    let count = 0
    let start = index==0 ? 0 : seq[0][0] 
    for(let i = start; i<=lastEl; i++){ 
      if(i>=seq[0][0] && i<=seq[0][seq[0].length-1]){
        mappings[0].push(i)
        mappings[1].push(seq[1][count])
        count++
      }else{
        mappings[0].push(i)
        mappings[1].push(i)
        count=0
      }
    }
  })
  return mappings
}