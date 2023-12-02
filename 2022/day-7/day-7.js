const fs = require('fs');


const dataURL = './day-7/day-7-test.txt'

const rawData = fs.readFileSync(dataURL, 'utf-8');

const data = rawData.split('$ ').splice(1).map(command=>{
  return command.trim().split('\n')
})

let folderStructure = {}
let directory = ''
let directoryDepth = 0

data.forEach(command=>{
  const currentCommand = command[0].split(' ')
  if(currentCommand[0] == 'cd'){
    if(currentCommand[1]==".."){
      directoryDepth -= 1;
    }else{ 
      directoryDepth += 1;
    }
    console.log(currentCommand[0])
    console.log(directoryDepth)
  }
})

// console.log(data)