const fs = require("fs")

const dataURL = './day-6/day-6.txt'

const dataRaw = fs.readFileSync(dataURL, 'utf-8')
let hasMatch = false
let answer = 0

// change this from 4 to 14 for parts one and two
const numberOfLetters = 14

for(let i=0; i<dataRaw.length-numberOfLetters; i++){
  hasMatch = false
  const chunk = dataRaw.slice(i, i+numberOfLetters)
  
  for(let j = 0; j<chunk.length; j++){
    if(hasMatch == true) break
    for(let k = 0; k<chunk.length; k++){
      if(hasMatch == true) break
      if(j==chunk.length-1 & k==chunk.length-1){
        answer = i+numberOfLetters
        console.log(answer)
        return
      }else if(j==k){
        continue
      }else if(chunk[j]==chunk[k]){
        hasMatch = true
      }
    }
  }
}
