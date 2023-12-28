#!/usr/bin/env node
// currencyConverter.ts
import chalk from 'chalk';
import inquirer from 'inquirer';
// Sample conversion rates (replace with actual rates)
const conversionRates = {
    "PKR (Pakistani Rupes)": 280,
    "USD (Dollar)": 1,
    "EUR (Euro)": 0.95,
    "SAR (Saudi Arab Riyal)": 3.75,
    "GBP (British Pound)": 0.81, // Japanese Yen
    // Add more currencies as needed
};
async function main() {
    const userInput = await inquirer.prompt([
        {
            type: 'input',
            name: 'amount',
            message: chalk.blue('Enter the amount you want to convert:'),
            validate: (input) => !isNaN(parseFloat(input)) || 'Please enter a valid number',
        },
        {
            type: 'list',
            name: 'fromCurrency',
            message: chalk.green('Select your currency code:'),
            choices: ["PKR (Pakistani Rupes)", "USD (Dollar)", "EUR (Euro)", "SAR (Saudi Arab Riyal)", "GBP (British Pound)"]
        },
        {
            type: 'list',
            name: 'toCurrency',
            message: chalk.green('Select the target currency code:'),
            choices: ["USD (Dollar)", "EUR (Euro)", "SAR (Saudi Arab Riyal)", "GBP (British Pound)"]
        }
    ]);
    const amount = parseFloat(userInput.amount);
    const fromCurrency = userInput.fromCurrency;
    const toCurrency = userInput.toCurrency;
    const convertedAmount = convertCurrency(amount, fromCurrency, toCurrency);
    if (!isNaN(convertedAmount)) {
        console.log(chalk.redBright(`${amount} ${fromCurrency} is equal to ${convertedAmount.toFixed(2)} ${toCurrency}`));
    }
}
function convertCurrency(amount, fromCurrency, toCurrency) {
    if (!conversionRates[fromCurrency] || !conversionRates[toCurrency]) {
        console.log('Invalid currency code.');
        return NaN;
    }
    return (amount / conversionRates[fromCurrency]) * conversionRates[toCurrency];
}
main();
