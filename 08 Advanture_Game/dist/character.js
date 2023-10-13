class Character {
    constructor(name, health) {
        this.name = name;
        this.health = health;
    }
    displayStatus() {
        console.log(`${this.name}'s  HP: ${this.health}`);
    }
    takeDamage(amount) {
        this.health -= amount;
    }
    getRandomNum(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}
export default Character;
