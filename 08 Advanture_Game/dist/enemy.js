import Character from "./Character.js";
import chalk from "chalk";
class Enemy extends Character {
    constructor(name, health, attackDamage) {
        super(name, health);
        this.attackDamage = attackDamage;
    }
    attackOnPlayer(player) {
        let playerDamage = this.getRandomNum(1, this.attackDamage);
        player.takeDamage(playerDamage);
        console.log(chalk.green(`> Moster strike the ${player.name} for ${playerDamage} damage.`));
    }
}
export default Enemy;
