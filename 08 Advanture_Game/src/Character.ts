class Character{
    name:string;
    health: number;
    constructor(name:string,health:number){
        this.name =name;
        this.health =health;

    }

    displayStatus():void{
        console.log(`${this.name}'s  HP: ${this.health}`)
    }
    takeDamage(amount:number):void{
        this.health -= amount;
        
    }
    getRandomNum(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
}

export default Character;