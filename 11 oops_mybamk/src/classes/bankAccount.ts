
class BankAccount{
    accountNumber = Math.floor(Math.random() * (9 * (Math.pow(10, 10)))) + (Math.pow(10, 10))
    accountBalance: number
    transactionHistory: { type: "Credit" | "Debit", amount: number, date: string, fee: number }[] = []
    constructor() {
        this.accountBalance = 100
    }
    Debit(amount: number) {
                let index = String(new Date()).lastIndexOf(':') + 3
                let date = String(new Date()).slice(0, index)
                this.accountBalance -= amount
                this.transactionHistory.push({ type: 'Debit', amount: amount, date: date, fee: 0 })
            }
            Credit(amount: number) {
                let index = String(new Date()).lastIndexOf(':') + 3
                let date = String(new Date()).slice(0, index)
                this.accountBalance += amount-2
                this.transactionHistory.push({ type: 'Debit', amount: amount, date: date, fee: 2 })
            }
}

export default BankAccount