#!/usr/bin/env node
import ATM from './atm.js';
import inquirer from "inquirer";
async function main() {
    console.log('Welcome to the ATM system!');
    const atm = new ATM();
    console.log('user= admin, password=', atm.showPassword());
    // Prompt for user ID and PIN
    const userId = await inquirer.prompt([{
            type: 'text',
            name: 'userId',
            message: 'Enter your user ID:'
        }]);
    const userPin = await inquirer.prompt([{
            type: 'password',
            name: 'userPin',
            message: 'Enter your PIN:'
        }]);
    // Authenticate user
    if (atm.authenticate(userPin.userPin)) {
        console.log('Authentication successful. ATM functionalities unlocked.');
        // Implement the rest of the application logic here
        const balance = atm.checkBalance();
        console.log(`Account No / User ID: $${userId.userId}`);
        console.log(`Your account balance is: $${balance}`);
        // Add other functionalities like withdraw, deposit, etc.
    }
    else {
        console.log('Authentication failed. Please try again.');
    }
}
// Run the main function
main();
