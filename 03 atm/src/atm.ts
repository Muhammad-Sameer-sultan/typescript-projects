// atm.ts
export default class ATM {
    private userId: string;
    private userPin: string;
    private balance: number;

    constructor(userId: string='admin') {
        this.userId = userId;
        this.userPin = this.generateRandomPin();
        this.balance = this.generateRandomBalance();
    }

    private generateRandomPin(): string {
        return Math.floor(1000 + Math.random() * 9000).toString();
    }

    private generateRandomBalance(): number {
        return Math.floor(Math.random() * 10000);
    }

    authenticate(pin: string): boolean {
        return this.userPin === pin;
    }

    checkBalance(): number {
        return this.balance;
    }
    showPassword(){
        return this.userPin;
    }
    // Implement other ATM functionalities (withdraw, deposit, etc.)
}
