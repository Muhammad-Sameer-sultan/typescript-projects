#!/usr/bin/env node
import inquirer from "inquirer";

async function GuessNumber() {
    const min: number=1;
    const max: number=100;
    let attempt=0;

    const thinkNum= Math.floor(Math.random()*(max-min+1))+min; 

    console.log("<========= Welcome to the Guess the Number game!========>")
    console.log(`I'm thinking of a number between ${min} and ${max}.`);

    console.log(thinkNum )
while(true){
    const guestInpNum=await inquirer.prompt([{
        type: 'number',
        name: "inpNum",
        message: 'Guess the Number'
    }])
    const userGuess=parseInt(guestInpNum.inpNum)
        attempt++
        
        if(thinkNum === userGuess ){
        console.log(`Congratulations! You guessed the number ${thinkNum} in ${attempt} attempts.`)
        break;
        }
        else if(thinkNum > userGuess){
            console.log('Try a higher number.')
            continue
        }
        else if(thinkNum < userGuess){
            console.log('Try a lower number.')
            continue
        }
        else{
            console.log("Not a Valid Number")
        }
}
  
       
  
   
}

GuessNumber();