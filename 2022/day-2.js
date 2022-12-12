const fs = require("fs")

//A = Rock
//B = Paper
//C = Scissors 


let Rock =  1
let Paper =  2
let Scissors =  3

const loss = 0
const tie = 3
const win = 6

const elfChoicesKey = [['A', "Rock"], ["B", "Paper"], ["C", "Scissors"]]
const myChoicesKey = [['X', "Rock", 1], ["Y", "Paper", 2], ["Z", "Scissors", 3]]

//Load the data
const dataURL = "./data/day-2.txt"
const rawData = fs.readFileSync(dataURL, 'utf-8')

const data = rawData.split("\n").map(round => {
  return round.split(" ")
})

let elfPlays = []
let myPlays = []

data.forEach(singleData => {
  elfChoicesKey.forEach(elfChoice =>{
    if(elfChoice[0]==singleData[0]){
      elfPlays.push(elfChoice[1])
    }
  })
  myChoicesKey.forEach(myChoice =>{
    if(myChoice[0]==singleData[1]){
      myPlays.push(myChoice[1])
    }
  })
})

let totalPointsPartOne = []

myPlays.forEach(myPlay =>{
  myChoicesKey.forEach(myChoice =>{
    if(myChoice[1] == myPlay){
      totalPointsPartOne.push(myChoice[2])
    }
  })
})


myPlays.forEach((myPlay,index)=>{
  if(myPlay == "Rock"){
    if(elfPlays[index]=="Paper"){
      totalPointsPartOne.push(loss)
    }
    if(elfPlays[index]=="Scissors"){
      totalPointsPartOne.push(win)
    }
    if(elfPlays[index]=="Rock"){
      totalPointsPartOne.push(tie)
    }
  }
  if(myPlay == "Paper"){
    if(elfPlays[index]=="Paper"){
      totalPointsPartOne.push(tie)
    }
    if(elfPlays[index]=="Scissors"){
      totalPointsPartOne.push(loss)
    }
    if(elfPlays[index]=="Rock"){
      totalPointsPartOne.push(win)
    }
  }
  if(myPlay == "Scissors"){
    if(elfPlays[index]=="Paper"){
      totalPointsPartOne.push(win)
    }
    if(elfPlays[index]=="Scissors"){
      totalPointsPartOne.push(tie)
    }
    if(elfPlays[index]=="Rock"){
      totalPointsPartOne.push(loss)
    }
  }
})

const answerPartOne = totalPointsPartOne.reduce((a,b)=> a+b , 0)

// console.log(answerPartOne)



const howToPlay = [['X', "loss"], ["Y", "tie"], ["Z", "win"]]

let totalPointsPartTwo = []

let myWantedOutcome = []

data.forEach(play => {
  howToPlay.forEach(outcome => {
    if(outcome[0]==play[1]){
      myWantedOutcome.push(outcome[1])
    }
  })
})

myWantedOutcome.forEach((play, index) => {
  if(play=="win"){
    totalPointsPartTwo.push(win)
    if(elfPlays[index]=="Rock"){
      // myPlay is paper
      totalPointsPartTwo.push(Paper)
    }
    if(elfPlays[index]=="Paper"){
      //myPlay is Scissors
      totalPointsPartTwo.push(Scissors)
    }
    if(elfPlays[index]=="Scissors"){
      //myPlay is Rock
      totalPointsPartTwo.push(Rock)
    }
  }
  if(play=="loss"){
    totalPointsPartTwo.push(loss)
    if(elfPlays[index]=="Rock"){
      // myPlay is paper
      totalPointsPartTwo.push(Scissors)
    }
    if(elfPlays[index]=="Paper"){
      //myPlay is Scissors
      totalPointsPartTwo.push(Rock)
    }
    if(elfPlays[index]=="Scissors"){
      //myPlay is Rock
      totalPointsPartTwo.push(Paper)
    }
  }
  if(play=="tie"){
    totalPointsPartTwo.push(tie)
    if(elfPlays[index]=="Rock"){
      // myPlay is paper
      totalPointsPartTwo.push(Rock)
    }
    if(elfPlays[index]=="Paper"){
      //myPlay is Scissors
      totalPointsPartTwo.push(Paper)
    }
    if(elfPlays[index]=="Scissors"){
      //myPlay is Rock
      totalPointsPartTwo.push(Scissors)
    }
  }

})

const answerPartTwo = totalPointsPartTwo.reduce((a,b)=>a+b,0)

console.log(answerPartTwo)










