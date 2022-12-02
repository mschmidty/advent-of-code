const fs = require('fs');

const testData = [
  "00100",
  "11110",
  "10110",
  "10111",
  "10101",
  "01111",
  "00111",
  "11100",
  "10000",
  "11001",
  "00010",
  "01010"
]

const parsedTestData = testData.map(number =>{
  return number.split('')
})

fs.readFile('./datasets/day-3.txt', 'utf-8', (err, rawData)=>{
  if(err){
    console.log(err)
    return
  }
  
  const arrayData = rawData.split('\n');
  const splitData = arrayData.map(number =>{
    return number.split('')
  })
  console.log("Part one Answer: " + findMostCommon(splitData));

  const oxygenDecimal = parseInt(parseBinary2(splitData, 0), 2)
  const coTwoDecimal = parseInt(parseBinary2(splitData, 0, oxygen=false), 2)
  console.log("Part two Answer: " + oxygenDecimal*coTwoDecimal)
})

//Part one function
function findMostCommon(data){

  const reshaped = reshape(data);

  let gammaRate = [];
  for(let i = 0; i < reshaped.length; i++){
    let sum = reshaped[i].reduce((a, b)=> a+b);
    if(sum/reshaped[i].length>0.50){
      gammaRate.push("1")
    }else{
      gammaRate.push("0")
    }
  }
  const epsilonRate = gammaRate.map(x=>{
    if(x=="1"){
      return "0"
    }else{
      return "1"
    }
  })
  const gammaDec = parseInt(gammaRate.reduce((a, b)=>a+b), 2)
  const epsilonDec = parseInt(epsilonRate.reduce((a, b)=>a+b), 2)
  return gammaDec * epsilonDec
}

// Part 2 Function

function parseBinary2(data, iterator, oxygen=true){
  //reshape the data
  let meltedData = reshape(data)
  //check iterator location to see what is the most common binary
  let mostCommon = meltedData[iterator].reduce((a,b)=>a+b);
  let isItGreater = mostCommon/(meltedData[iterator].length);
  let returnValue;
  if(oxygen==true){
    if(isItGreater>=0.5){
      returnValue = '1';
    }else{
      returnValue = '0';
    }
  }else{
    if(isItGreater>=0.5){
      returnValue = '0';
    }else{
      returnValue = '1';
    }
  }
  
  let redoThisData = data.filter(array=>{
    return array[iterator]== returnValue;
  })
  if(redoThisData.length==1){
    const answer = redoThisData[0].reduce((a,b)=>a+b)
    return answer;
  }
  iterator++
  return parseBinary2(redoThisData, iterator, oxygen=oxygen)
}

//Shared function
function reshape(data){
  let reshaped = [];
  for(let i = 0; i < data.length; i++){
    for(let j = 0; j < data[i].length; j++){ 
      if(i<1){
        reshaped.push([parseInt(data[i][j])])
      }else{
        reshaped[j].push(parseInt(data[i][j]))
      }
    }
  }
  return reshaped
}