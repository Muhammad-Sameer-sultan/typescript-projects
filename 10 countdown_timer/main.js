import inquirer from 'inquirer';
import chalk from 'chalk';
import { createSpinner } from 'nanospinner';
function startTimer(completeDate) {
    console.log(chalk.bgGreen.whiteBright(` Days | Hours | Minutes | Seconds `));
    const timer = setInterval(() => {
        const currentDate = new Date().getTime();
        // console.log("current date",currentDate)
        const targetDate = new Date(completeDate).getTime();
        // console.log("targett date",targetDate)
        const timeDifference = targetDate - currentDate;
        // console.log("timeDiff",timeDifference)
        // if (timeDifference < 0) {
        //   process.stdout.clearLine(0);
        //   process.stdout.cursorTo(0);
        //   console.log(chalk.redBright('Expired'));
        //   console.log(chalk.whiteBright(`=======================================================\n`));
        //   clearInterval(timer);
        //   return;
        // }
        const seconds = Math.floor(timeDifference / 1000) % 60;
        const minutes = Math.floor(timeDifference / (1000 * 60)) % 60;
        const hours = Math.floor(timeDifference / (1000 * 60 * 60)) % 24;
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        process.stdout.clearLine(0);
        process.stdout.cursorTo(0);
        process.stdout.write(`  ${days > 9 ? String(days) : `0${String(days)}`}  :   ${hours > 9 ? String(hours) : `0${String(hours)}`}  :   ${minutes > 9 ? String(minutes) : `0${String(minutes)}`}    :   ${seconds > 9 ? String(seconds) : `0${String(seconds)}`}`);
    }, 1000);
}
async function getUserInput(name, regex) {
    while (true) {
        const input = await inquirer.prompt([
            {
                name: 'date_and_time',
                message: chalk.whiteBright(`Enter ${name} : `),
                default: name === 'Date' ? '1/25/2024' : '12:00 AM',
            },
        ]);
        const value = input['date_and_time'];
        if (regex.test(value)) {
            return value;
        }
        else {
            console.log(chalk.redBright(`Enter Correct Pattern Of ${name}`));
        }
    }
}
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
async function main() {
    console.log(chalk.bold.rgb(204, 204, 204)(`<<<========  ${chalk.redBright.bold('COUNTDOWN TIMER')}  ========>>>`));
    console.log(chalk.whiteBright(`                 `));
    console.log(chalk.bgBlue.whiteBright(`  Instructions:  `));
    console.log(chalk.whiteBright(`--------------------------------------------------------------------------`));
    console.log(`${chalk.whiteBright('1 =>')} Date Format: ${chalk.bgGreen.whiteBright(' MM/DD/YYYY [Year Limit 2023-2025] ')} Example: ${chalk.bgGreen.whiteBright(' 1/25/2024 ')}.`);
    console.log(chalk.whiteBright(`--------------------------------------------------------------------------`));
    console.log(`${chalk.whiteBright('2 =>')} Time Format: ${chalk.bgGreen.whiteBright(' Hours[0-12]:Minutes[0-59] PM/AM ')} Example: ${chalk.bgGreen.whiteBright(' 11:30 AM ')}.`);
    console.log(chalk.whiteBright(`--------------------------------------------------------------------------`));
    console.log(`${chalk.whiteBright('3 =>')} Timer Will Be Expired If Time Is Ended.`);
    console.log(chalk.whiteBright(`--------------------------------------------------------------------------`));
    console.log(`${chalk.whiteBright('4 =>')} Press ${chalk.bgGreen.whiteBright(' Ctrl + C ')} To Stop Timer.`);
    console.log(chalk.whiteBright(`--------------------------------------------------------------------------\n`));
    const dateRegex = /^(0?[1-9]|1[012])[\/](0?[1-9]|[12][0-9]|3[01])[\/](202[3-5])$/;
    const timeRegex = /^(0?[0-9]|[1][012]):(0?[0-9]|[1-5][0-9]) ((a|p)m|(A|P)M)$/;
    const date = await getUserInput('Date', dateRegex);
    const time = await getUserInput('Time', timeRegex);
    const completeDate = `${date} ${time}`;
    // console.log(completeDate)
    const spinner = createSpinner('Starting Timer').start();
    // console.log(spinner)
    await sleep(2000);
    spinner.success({ text: 'Timer Started Successfully' });
    // 10/15/2023
    // 2:00 am
    console.log(chalk.whiteBright(`\n=======================================================`));
    startTimer(completeDate);
}
main();
