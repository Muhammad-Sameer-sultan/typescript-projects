import inquirer from 'inquirer';
import chalk from 'chalk';

class Character {
  name: string;
  health: number;

  constructor(name: string, health: number) {
    this.name = name;
    this.health = health;
  }

  displayStatus(): void {
    console.log(`${this.name}'s HP: ${this.health}`);
  }

  takeDamage(amount: number): void {
    this.health -= amount;
  }
}

class Player extends Character {
  attackDamage: number;
  numHealthPotions: number;

  constructor(name: string) {
    super(name, 100);
    this.attackDamage = 50;
    this.numHealthPotions = 3;
  }

  attack(enemy: Enemy): void {
    const damageDealt = getRandomInt(1, this.attackDamage);
    enemy.takeDamage(damageDealt);
    console.log(chalk.green(`> You strike the ${enemy.name} for ${damageDealt} damage.`));
  }

  drinkHealthPotion(): void {
    if (this.numHealthPotions > 0) {
      this.health += 30;
      this.numHealthPotions--;
      console.log(chalk.green(`> You drink a potion, healing yourself for 30.`));
      console.log(chalk.green(`> You now have ${this.health} HP.`));
      console.log(chalk.green(`> You have ${this.numHealthPotions} health potion(s) left.\n`));
    } else {
      console.log(chalk.yellow("> You have no health potions left! Defeat enemies for a chance to get one!\n"));
    }
  }
}

class Enemy extends Character {
  attackDamage: number;

  constructor(name: string, health: number, attackDamage: number) {
    super(name, health);
    this.attackDamage = attackDamage;
  }

  attack(player: Player): void {
    const damageTaken = getRandomInt(1, this.attackDamage);
    player.takeDamage(damageTaken);
    console.log(chalk.red(`> ${this.name} strikes you for ${damageTaken} damage.`));
  }
}

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

class DungeonAdventure {
  player: Player;

  constructor(playerName: string) {
    this.player = new Player(playerName);
  }

  async start(): Promise<void> {
    console.log(chalk.yellow("Welcome to the Dungeon"));

    while (this.player.health > 0) {
      const enemy = new Enemy("Monster", getRandomInt(1, 75), 25);
      console.log(chalk.cyan(`\n# ${enemy.name} appeared! #`));

      while (enemy.health > 0) {
        this.player.displayStatus();
        enemy.displayStatus();

        const { choice } = await inquirer.prompt([
          {
            type: 'list',
            name: 'choice',
            message: chalk.blue('\nWhat would you like to do?'),
            choices: ['Attack', 'Drink health potion', 'Run'],
          },
        ]);

        if (choice === 'Attack') {
          this.player.attack(enemy);
          if (enemy.health > 0) {
            enemy.attack(this.player);
          }
        } else if (choice === 'Drink health potion') {
          this.player.drinkHealthPotion();
          enemy.attack(this.player);
        } else if (choice === 'Run') {
          console.log(chalk.yellow(`You run away from the ${enemy.name}!\n`));
          break;
        }
      }

      if (this.player.health < 1) {
        console.log(chalk.red("You have taken too much damage, you are too weak to go on!"));
        break;
      }

      console.log(chalk.cyan(`# ${enemy.name} was defeated! #`));
      console.log(chalk.cyan(`# You have ${this.player.health} HP left. #`));

      if (getRandomInt(1, 100) < 50) {
        this.player.numHealthPotions++;
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

      if (action === 'Exit dungeon') {
        console.log(chalk.green("You exit the dungeon, successful from your adventures!"));
        break;
      }
    }

    console.log(chalk.yellow("########################"));
    console.log(chalk.yellow("# THANKS FOR PLAYING! #"));
    console.log(chalk.yellow("########################"));
  }
}

// Start the game
const playerName = await inquirer.prompt({
  type: 'input',
  name: 'name',
  message: chalk.yellow('Enter your name:'),
});
const dungeonAdventure = new DungeonAdventure(playerName.name);
dungeonAdventure.start();
