import inquirer from 'inquirer';
class Student {
    static studentCount = 0;
    studentID;
    name;
    courses = [];
    balance = 0;
    constructor(name) {
        this.name = name;
        this.studentID = this.generateStudentID();
        Student.studentCount++;
    }
    generateStudentID() {
        const randomNumber = Math.floor(10000 + Math.random() * 90000);
        return `SID${randomNumber}`;
    }
    enroll(course) {
        this.courses.push(course);
        this.balance += 1000; // Assuming each course costs 1000
        console.log(`${this.name} has enrolled in ${course}.`);
    }
    viewBalance() {
        console.log(`${this.name}'s balance is $${this.balance}.`);
    }
    payTuition(amount) {
        if (amount <= this.balance) {
            this.balance -= amount;
            console.log(`${this.name} has paid $${amount} towards tuition.`);
        }
        else {
            console.log(`Insufficient balance. Please check your balance.`);
        }
    }
    showStatus() {
        console.log(`Student Details:`);
        console.log(`ID: ${this.studentID}`);
        console.log(`Name: ${this.name}`);
        console.log(`Courses Enrolled: ${this.courses.join(', ')}`);
        console.log(`Balance: $${this.balance}`);
    }
}
async function main() {
    const students = {};
    while (true) {
        const { action } = await inquirer.prompt({
            type: 'list',
            name: 'action',
            message: 'Choose an action:',
            choices: ['Enroll', 'View Balance', 'Pay Tuition', 'Show Status', 'Exit'],
        });
        switch (action) {
            case 'Enroll':
                const { studentName, course } = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'studentName',
                        message: 'Enter student name:',
                    },
                    {
                        type: 'input',
                        name: 'course',
                        message: 'Enter course to enroll:',
                    },
                ]);
                if (!students[studentName]) {
                    students[studentName] = new Student(studentName);
                }
                students[studentName].enroll(course);
                break;
            case 'View Balance':
                const { studentToView } = await inquirer.prompt({
                    type: 'input',
                    name: 'studentToView',
                    message: 'Enter student name to view balance:',
                });
                if (students[studentToView]) {
                    students[studentToView].viewBalance();
                }
                else {
                    console.log('Student not found.');
                }
                break;
            case 'Pay Tuition':
                const { studentToPay, amount } = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'studentToPay',
                        message: 'Enter student name to pay tuition:',
                    },
                    {
                        type: 'number',
                        name: 'amount',
                        message: 'Enter amount to pay:',
                    },
                ]);
                if (students[studentToPay]) {
                    students[studentToPay].payTuition(amount);
                }
                else {
                    console.log('Student not found.');
                }
                break;
            case 'Show Status':
                const { studentToShowStatus } = await inquirer.prompt({
                    type: 'input',
                    name: 'studentToShowStatus',
                    message: 'Enter student name to show status:',
                });
                if (students[studentToShowStatus]) {
                    students[studentToShowStatus].showStatus();
                }
                else {
                    console.log('Student not found.');
                }
                break;
            case 'Exit':
                process.exit();
        }
    }
}
main();
