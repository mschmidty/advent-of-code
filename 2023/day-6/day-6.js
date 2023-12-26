const fs = require('fs');

const dataURL = "day-6.txt"
// const dataURL = "day-6-test.txt"

const startSpeed = 0;
const increaseMmPerMillisecHold = 1;

const rawData = fs.readFileSync(dataURL, 'utf-8')

const dataPartOne = rawData
  .split("\n")
  .map((line, index)=>{
    return line.split(/\s+/)
  })

let answersPartOne = []
for(let i = 1; i<dataPartOne[0].length; i++){
  answersPartOne.push(checkWin(dataPartOne[0][i], dataPartOne[1][i]))
}
// console.log(answersPartOne.reduce((a,b)=>a*b,1));

function checkWin(raceLength, checkDistance){
  let winningRaces = [];
  for(let j = 0; j<=raceLength; j++){
    const holdLength = j;
    const speed = holdLength*increaseMmPerMillisecHold;
    const timeToTravel = raceLength-holdLength;
    const distance = speed*timeToTravel;
    if(distance>checkDistance){
      winningRaces.push(distance)
    }
  }
  return winningRaces.length
}

//Part Two


const dataPartTwo = dataPartOne
  .map(line =>{
    return +line
      .slice(1,line.length)
      .reduce((a,b)=>{
        return a+''+b
      }, "")
  })
  
function checkToStart(raceLength, checkDistance){
  let winningRaces
  for(let j = 0; j<=raceLength; j++){
    const holdLength = j;
    const speed = holdLength*increaseMmPerMillisecHold;
    const timeToTravel = raceLength-holdLength;
    const distance = speed*timeToTravel;
    if(distance<checkDistance){
      
    }else{
      winningRaces = j
      break
    }
  }
  return winningRaces
}

function checkEnd(raceLength, checkDistance){
  let winningRaces
  for(let j = raceLength; j>=0; j--){
    const holdLength = j;
    const speed = holdLength*increaseMmPerMillisecHold;
    const timeToTravel = raceLength-holdLength;
    const distance = speed*timeToTravel;
    if(distance<checkDistance){
      
    }else{
      winningRaces = j
      break
    }
  }
  return winningRaces
}
// console.log(dataPartTwo)
console.log(checkEnd(dataPartTwo[0], dataPartTwo[1])-checkToStart(dataPartTwo[0], dataPartTwo[1])+1);
