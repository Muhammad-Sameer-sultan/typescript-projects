import chalk from 'chalk';
import BankAccount from './bankAccount.js';

class Customer{
    name: string
    userId:string
    age: number
    contactNumber: string
    pin: number
    bankAccount: BankAccount

    constructor(name:string,age: number,contact:string, pin:number,userId:string){
        this.name=name;
        this.userId= userId;
        this.age = age ;
        this.contactNumber=contact;
        this.pin = pin;
        this.bankAccount= new BankAccount;
    }

        DisplayInfo(customer:any): void {
          console.log(chalk.whiteBright(`--------------------------------------`));
          console.log(`${chalk.bgRgb(1, 59, 52)(`Name            : `)} ${customer.name}`);
          console.log(`${chalk.bgRgb(1, 59, 52)(`Age             : `)} ${customer.age}`);
          console.log(`${chalk.bgRgb(1, 59, 52)(`Contact Number  : `)} ${customer.contactNumber}`);
          console.log(`${chalk.bgRgb(1, 59, 52)(`UserID          : `)} ${customer.userId}`);
          console.log(`${chalk.bgRgb(1, 59, 52)(`Account Balance : `)} RS: ${customer.bankAccount.accountBalance}`);
          console.log(`${chalk.bgRgb(1, 59, 52)(`Account Number  : `)} ${customer.bankAccount.accountNumber}`);
          console.log(chalk.whiteBright(`--------------------------------------`));
        }
}

export default Customer;