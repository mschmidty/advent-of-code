const fs = require("fs");

// const dataURL = "./day-5-test.txt"
const dataURL = "./day-5.txt"

const dataRaw = fs.readFileSync(dataURL, 'utf-8').split(/\n\s*\n/)
.map(line=>{
  const splitLines = line.split(/\:\s|\:/)
  const numberList = splitLines[1].split("\n").map(numbers=>numbers.split(" ").map(number=>+number))
  return numberList
})

const seeds = dataRaw[0][0]
const maps = dataRaw.slice( 1, dataRaw.length)

const possibleAnswers = seeds.map(seed=>{
  return runMaps(seed, maps)
})

//Part one
// console.log(Math.min(...possibleAnswers))

function runMaps(seed, maps){
  let currentSeedValue = seed
  for(let map of maps){
    currentSeedValue = runOneMap(currentSeedValue, map)
  }
  return currentSeedValue
}

function runOneMap(currentSeed, setOfMaps){
  returnSeed = currentSeed
  for(let oneMap of setOfMaps){
    const range = oneMap[2]
    const startSource = oneMap[1]
    const endSource = startSource+range
    const destStart = oneMap[0]
    if(currentSeed>=startSource & currentSeed<=endSource){
      const diff = currentSeed-startSource
      returnSeed = diff+destStart
      break
    }
  }
  return returnSeed
}

//Part Two
let partTwoSeedSets = []
for(let i = 0; i<seeds.length; i=i+2){
  partTwoSeedSets.push([seeds[i], seeds[i+1]])
}

// console.log(partTwoSeedSets);
const chunkSize = 50000;
const possibleAnswersTwo = partTwoSeedSets.map(seedRange=>{
  let returnNums = []
  for(let i = 0; i<seedRange[1];i=i+chunkSize){
    const lowerRange = seedRange[0]+i
    const upperRangePos = seedRange[0]+i+chunkSize
    const upperRange = upperRangePos>seedRange[0]+seedRange[1]-1 ? seedRange[0]+seedRange[1]-1 : upperRangePos;
    const currentRange = [lowerRange, upperRange]
    let seedNums;
    if(lowerRange == upperRange){
      seedNums = [lowerRange]
    }else{
      seedNums= getSeeds2(currentRange)
    }
    const posAnswers = seedNums.map(seed=>{
      return runMaps(seed, maps)
    })
    const getMin = Math.min(...posAnswers)
    returnNums.push(getMin)
  }
  return Math.min(...returnNums)
})

console.log(Math.min(...possibleAnswersTwo));



// console.log(partTwoSeeds)

function getSeeds(seedRange){
  let returnSeeds = []
    for(let i = 0; i<seedRange[1]; i++){
      returnSeeds.push(seedRange[0]+i)
    }
  return returnSeeds
}
function getSeeds2(seedRange){
  let returnSeeds = []
  for(let i = seedRange[0]; i<seedRange[1]; i++){
    returnSeeds.push(i)
  }
  return returnSeeds
}

