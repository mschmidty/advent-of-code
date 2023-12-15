const fs = require("fs");

// const dataURL = "./day-4-test.txt"
const dataURL = "./day-4.txt"

const data = fs.readFileSync(dataURL, 'utf-8')
  .split("\n")
  .map(card=>{
    const numbersFromValues = card.split(": ")
    const cardNumber = numbersFromValues[0].split(" ")[1]
    const numbers = numbersFromValues[1].trim().split(" | ").map(numberSeq =>{
      return numberSeq.split(" ").filter(number=>number!=' ')
    })
    return [+cardNumber, numbers]
  })

const matches = data.map(card=>{
  const winners = card[1][0]
  const compares = card[1][1]
  let cardNumbers = []
  for(let winner of winners){
    if(winner!=""){
      for(let compare of compares){
        if(+compare === +winner){
          cardNumbers.push(1)
          break
        }
      }
    }
  }
  return cardNumbers
})

const accumMatches = matches.map(winners=>{
  if(winners.length==0){
    return 0
  }
  if(winners.length>1){
    return winners.reduce((a,b,i)=>{
      if(i==1){
        return a + b
      }else{
        return a * 2
      }
    })
  }else{
    return 1
  }
})
const answerOne = accumMatches.reduce((a,b)=>a+b)


//Part Two
let accumulationOfMatches =[]
for(let i=0;i<matches.length;i++){
  if(accumulationOfMatches[i]){
    accumulationOfMatches[i].push(1)
  }else{
    accumulationOfMatches.push([1])
  }
  for(let k=0; k<accumulationOfMatches[i].length; k++){
    for(let j=0; j<matches[i].length; j++){
      if(accumulationOfMatches[i+j+1]){
        accumulationOfMatches[i+j+1].push(1)
      }else{
        accumulationOfMatches.push([1])
      }
    }
  }
}
const answerTwo = accumulationOfMatches.map(cardCount=>{
  return cardCount.reduce((a,b)=>a+b)
})
console.log(answerTwo.reduce((a,b)=>a+b))

