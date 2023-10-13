import chalk from "chalk";
import Character from "./Character.js";
import Enemy from "./enemy.js"

class Player extends Character {
  attackDamage: number;
  numHealthPotions: number;

  constructor(name: string) {
    super(name, 100);
    this.attackDamage = 25;
    this.numHealthPotions = 3;
  }

  attackOnEnemy(enemy: Enemy){
    let EnemyDamage= this.getRandomNum(1,this.attackDamage);
    enemy.takeDamage(EnemyDamage)
    console.log(chalk.green(`> You strike the ${enemy.name} for ${EnemyDamage} damage.`));
  }

  drinkHealthPostoin(): void {
    if (this.numHealthPotions > 0) {
      this.health += 30;
      this.numHealthPotions--;
      console.log(
        chalk.green(`> You drink a potion, healing yourself for 30.`)
      );
      console.log(chalk.green(`> You now have ${this.health} HP.`));
      console.log(
        chalk.green(
          `> You have ${this.numHealthPotions} health potion(s) left.\n`
        )
      );
    } else {
      console.log(
        chalk.yellow(
          "> You have no health potions left! Defeat enemies for a chance to get one!\n"
        )
      );
    }
  }
}

export default Player
