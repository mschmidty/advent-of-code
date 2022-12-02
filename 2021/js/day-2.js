const fs = require('fs');

const dataPath = "./datasets/day-2.txt"

const testData = [
  { direction: 'forward', amount: '5' },
  { direction: 'down', amount: '5' },
  { direction: 'forward', amount: '8' },
  { direction: 'up', amount: '3' },
  { direction: 'down', amount: '8' },
  { direction: 'forward', amount: '2' }
]

fs.readFile(dataPath, 'utf-8', (err, data)=>{
  if(err){
    console.log(err)
    return
  }
  const directionsArray = data.split('\n');
  const directionsJSON = directionsArray.map((order)=>{
    const direction = order.match(/[a-z]+/)[0];
    const amount = parseInt(order.match(/[1-9]+/)[0]);
    return {direction, amount}
  })
  //Part One
  const partOneAnswer = findPosition(directionsJSON)
  console.log("Part One Answer: " + partOneAnswer)
  
  console.log("-----------------")
  const partTwoAnswer = findPositionWithAIM(directionsJSON)
  console.log("Part 2 Answer: ", partTwoAnswer)
})

////
//Part One Functions
////
function findPosition(data){
  let depth = 0;
  let forward = 0;
  for(let i = 0; i<data.length; i++){
    const direction = data[i].direction;
    const amount = parseInt(data[i].amount);
    if(direction == 'up'){
      depth-=amount
    }else if(direction == 'down'){
      depth+=amount
    }else{
      forward+=amount
    }
  }
  return depth * forward
}
// const position = findPosition(testData)
// console.log(position)
//console.log(testData.length)

////
//Part Two Functions
////

function findPositionWithAIM(data){
  let depth = 0;
  let horizontal = 0;
  let aim = 0;

  for(let i = 0; i<data.length; i++){
    const direction = data[i].direction
    const amount = parseInt(data[i].amount)
    if(direction == 'up'){
      aim -= amount
    }else if(direction == 'down'){
      aim += amount
    }else{
      horizontal += amount
      depth += (aim * amount)
    }
  }
  return depth * horizontal
}

//console.log(findPositionWithAIM(testData))
