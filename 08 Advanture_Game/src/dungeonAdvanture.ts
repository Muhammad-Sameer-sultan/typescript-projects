import Player from "./Player.js";
import chalk from "chalk";
import Enemy from "./enemy.js";
import inquirer from "inquirer";

class DungeonAdventure {
  player: Player;
  constructor(playerName: string) {
    this.player = new Player(playerName);
  }

  async start(): Promise<void> {
    console.log(chalk.yellow("Welcome to the Dungeon"));

    while (this.player.health > 0) {
      const enemy = new Enemy("Monster", this.player.getRandomNum(1,75), 25);
      console.log(chalk.cyan(`\n# ${enemy.name} appeared! #`));
      while (enemy.health > 0) {
        this.player.displayStatus();
        enemy.displayStatus();

        const { choice } = await inquirer.prompt([
          {
            type: "list",
            name: "choice",
            message: chalk.blue("\nWhat would you like to do?"),
            choices: ["Attack", "Drink health potion", "Run"],
          },
        ]);

        switch (choice) {
          case "Attack":
            if(enemy.health>0){
                
                enemy.attackOnPlayer(this.player);
            }
            this.player.attackOnEnemy(enemy);
            break;
          case "Drink health potion":
            this.player.drinkHealthPostoin();
            break;
          case "Run":
            console.log(chalk.yellow(`You run away from the ${enemy.name}!\n`));

            break;

          default:
            break;
        }
      }

      if (this.player.health < 1) {
        console.log(
          chalk.red(
            "You have taken too much damage, you are too weak to go on!"
          )
        );
        break;
      }
      console.log(chalk.cyan.bgGreenBright(`# ${enemy.name} was defeated! #`));
      console.log(chalk.cyan(`# You have ${this.player.health} HP left. #`));


      if(this.player.getRandomNum(1,100) > 50){
        this.player.numHealthPotions++
        console.log(chalk.bold.bgMagenta(` WoO! Health Gift for You `));
        console.log(chalk.cyan(`# The ${enemy.name} dropped a health potion! #`));
        console.log(chalk.cyan(`# You now have ${this.player.numHealthPotions} health potion(s). #`));
     
      }

      const { action } = await inquirer.prompt([
        {
          type: 'list',
          name: 'action',
          message: chalk.blue('What would you like to do now?'),
          choices: ['Continue fighting', 'Exit dungeon'],
        },
      ]);

      if(action==="Exit dungeon"){
        console.log(chalk.green("You exit the dungeon, successful from your adventures!"));
        break;
      }
    }

    console.log(chalk.yellow("########################"));
    console.log(chalk.yellow("# THANKS FOR PLAYING! #"));
    console.log(chalk.yellow("########################"));
  }
}

export default DungeonAdventure;
