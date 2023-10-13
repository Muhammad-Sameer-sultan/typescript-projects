import Character from "./Character.js";
import chalk from "chalk";
import Player from "./Player.js"

class Enemy extends Character{
    attackDamage:number;

    constructor(name:string,health:number,attackDamage:number){
        super(name,health)
        this.attackDamage=attackDamage;
    }
    attackOnPlayer(player: Player){
        let playerDamage= this.getRandomNum(1,this.attackDamage);
        player.takeDamage(playerDamage);
        console.log(chalk.green(`> Moster strike the ${player.name} for ${playerDamage} damage.`));
      }


}

export default Enemy