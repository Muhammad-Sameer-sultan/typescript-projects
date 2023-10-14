import inquirer from "inquirer";
import chalk from "chalk";
import DungeonAdventure from "./dungeonAdvanture.js"

const playerName = await inquirer.prompt({
    type: 'input',
    name: 'name',
    message: chalk.yellow('Enter your name:'),
  });
  const dungeonAdventure = new DungeonAdventure(playerName.name);
  dungeonAdventure.start();