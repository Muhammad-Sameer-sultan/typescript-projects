import inquirer from "inquirer";
import { createSpinner}  from "nanospinner";
import chalk from 'chalk'
import  Customer  from "./classes/customer.js"; // Update the path to match your file structure
import { DisplayInfo, ShowAccountBalance, Credit, Debit, TransactionHistory } from "./cutomeroption.js";

const sleep = () => new Promise((r) => setTimeout(r, 2000));

console.log(chalk.bold.rgb(204, 204, 204)(`<<<===========>>>  ${chalk.redBright.bold('MY BANK Managment System')}  <<<===========>>>`));

let customers: Customer[] = [];

async function choice(): Promise<'C' | 'S'> {
      const { option }: { option: 'C' | 'S' } = await inquirer.prompt([
        {
          type: 'list',
          name: "option",
          message: 'What Would You Like To Do ?',
          choices: [{ name: 'Create New Account', value: 'C' }, { name: 'Sign In', value: 'S' }],
        },
      ]);
      return option;
    }

async function createNewAccount(): Promise<void> {
  enum Names {
    Name = 'Name',
    Age = 'Age',
    ContactNumber = 'Contact Number',
    Pin = 'Pin',
    UserID = 'UserID',
  }

  async function inputs(name: Names, type: string): Promise<string | number> {
        while (true) {
          const { input } = await inquirer.prompt([
            {
              name: 'input',
              message: `Enter Your ${name} : `,
              type: type as any, // Fix the type casting issue
            },
          ]);
    
          if (!input) {
            continue;
          }
    
          if (name === Names.ContactNumber) {
            let numRegex = /^(\+92|0|92)[0-9]{10}$/;
            if (!numRegex.test(input)) {
              console.log(chalk.redBright(`  Use Pakistani Number`));
              continue;
            }
          }
    
          if (name === Names.UserID) {
            let customer = customers.find((val) => val.userId === input);
            if (customer) {
              console.log(chalk.redBright(`  This UserID Is Already Taken Try Different`));
              continue;
            }
          }
    
          return input;
        }
      }
      
  let name = (await inputs(Names.Name, 'string')) as string;
  let age = (await inputs(Names.Age, 'number')) as number;
  let contactNumber = (await inputs(Names.ContactNumber, 'string')) as string;
  let pin = (await inputs(Names.Pin, 'number')) as number;
  let userId = (await inputs(Names.UserID, 'string')) as string;
  let customer = new Customer(name, age, contactNumber, pin, userId);
  let spinner = createSpinner('Creating Account').start();
  await sleep();
  customers.push(customer);
  spinner.success({ text: chalk.whiteBright.bgRgb(0, 125, 17)(' Account Created Successfully ') });

}


async function signIn(): Promise<void> {
  const { userID, pin }: { userID: string; pin: number } = await inquirer.prompt([
    {
      name: 'userID',
      message: "Enter Your UserID : ",
    },
    {
      name: 'pin',
      message: 'Enter Your Pin : ',
      type: 'number',
    },
  ]);

  let customer = customers.find((val) => val.userId === userID);

  let spinner = createSpinner('Signing In').start();
  await sleep();

  if (!customer) {
    spinner.error({ text: chalk.whiteBright.bgRed(` No Customer With This UserID`) });
    return;
  } 
else {
    if (customer.pin !== pin) {
      spinner.error({ text: chalk.whiteBright.bgRed(` Incorrect PIN`) });
      return;
    }

    spinner.success({ text: chalk.whiteBright.bgRgb(0, 125, 17)('Signed In Successfully') });
    console.log(chalk.whiteBright(`\nxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx\n`));

    while (true) {
      const {
        userChoice,
      }: {
        userChoice: 'Show Profile' | 'Debit' | 'Credit' | 'Account Balance' | 'Transaction History';
      } = await inquirer.prompt([
        {
          name: 'userChoice',
          message: 'Make Your Choice',
          type: 'rawlist',
          choices: ['Show Profile', 'Debit', 'Credit', 'Account Balance', 'Transaction History'],
        },
      ]);

      switch (userChoice) {
        case 'Show Profile':
          DisplayInfo(customer);
          break;
        case 'Account Balance':
          ShowAccountBalance(customer);
          break;
        case 'Credit':
          await Credit(customer);
          break;
        case 'Debit':
          await Debit(customer);
          break;
        case 'Transaction History':
          TransactionHistory(customer);
          break;
        default:
          break;
      }

      const { choice }: { choice: 'Perform Another Task' | 'Sign Out' } = await inquirer.prompt([
        {
          name: 'choice',
          message: 'Select One: ',
          type: 'list',
          choices: ['Perform Another Task', 'Sign Out'],
        },
      ]);

      if (choice === 'Sign Out') {
        console.log(chalk.whiteBright(`\nxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx\n`));
        break;
      } else {
        console.log(chalk.whiteBright(`\nxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx\n`));
        continue;
      }
    }
  }
}


(async () => {
      while (true) {
        let userChoice = await choice();
    
        if (userChoice === 'C') {
          await createNewAccount();
        } else if (userChoice === 'S') {
          await signIn();
        }
    
        // EXIT PROGRAM CHOICE
        const input = await inquirer.prompt([
          {
            name: "isExit",
            message: chalk.rgb(255, 255, 160)(`Do You Want To Exit?`),
            type: 'confirm',
            default: false,
          },
        ]);
        let value: boolean = await input['isExit'];
        if (value) {
          break;
        }
        console.log(chalk.whiteBright('\n================================================================'));
        console.log(chalk.whiteBright('================================================================\n'));
      }
    })();
    