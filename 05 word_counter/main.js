#!/usr/bin/env node
import inquirer from "inquirer";
const main = async () => {
    const { para } = await inquirer.prompt({
        type: "input",
        name: "para",
        message: "Enter the paragraph"
    });
    const words = para.trim().split(/\s/).length;
    const characters = para.replace(/\s/g, "").length;
    // Split the input into words and count them
    console.log(`The total character is ${characters} and words ${words}`);
};
main();
