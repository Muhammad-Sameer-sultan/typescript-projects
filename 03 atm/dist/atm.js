// atm.ts
export default class ATM {
    constructor(userId = 'admin') {
        this.userId = userId;
        this.userPin = this.generateRandomPin();
        this.balance = this.generateRandomBalance();
    }
    generateRandomPin() {
        return Math.floor(1000 + Math.random() * 9000).toString();
    }
    generateRandomBalance() {
        return Math.floor(Math.random() * 10000);
    }
    authenticate(pin) {
        return this.userPin === pin;
    }
    checkBalance() {
        return this.balance;
    }
    showPassword() {
        return this.userPin;
    }
}
