//Advent of Code Day 1
const fs = require('fs');

//Get the data
const dataURL = "./datasets/day-1.txt"

fs.readFile(dataURL, 'utf-8', (err, data)=>{
  if(err){
    console.log(err)
    return
  }
  const clData = data.split('\n');
  //Part 1
  const partOneAnswer = countIncreases(clData)
  console.log("Part 1 Answer: " + partOneAnswer);

  //Part 2
  const windowArray = countIncreaseByWindow(clData, windowSize = 3);
  const partTwoAnswer = countIncreases(windowArray);
  console.log("Part 2 Answer: " + partTwoAnswer)

})

////
// Part 1 Functions
////

const testData = [199,200,208,210,200, 207, 240, 269, 260, 263]
//console.log(countIncreases(testData))

function countIncreases(data){
  let finalValue = 0;
  for(let i=1; i<=data.length; i++){
    const prev = data[i-1]
    const current = data[i]
    const diff = current-prev
    if(diff > 0) finalValue++
  }
  return finalValue
}


////
//Part 2 - Moving window average
////

function countIncreaseByWindow(data, windowSize=1){
  let windowValues = [];
  for(let i = windowSize; i< data.length+1; i++){
    const value3 = parseInt(data[i-1]);
    const value2 = parseInt(data[i-2]);
    const value1 = parseInt(data[i-3]);

    windowValues[i-3] =  value1 + value2 + value3;
  }
  return windowValues
}
////Tests
// const windowArray = countIncreaseByWindow(testData, windowSize = 3);
// const windowIncreasesCount = countIncreases(windowArray);
//console.log(windowIncreasesCount);



