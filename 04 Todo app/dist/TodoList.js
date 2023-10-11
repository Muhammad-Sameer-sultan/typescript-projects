import inquirer from 'inquirer';
import chalk from 'chalk';
export default class TodoList {
    todos = [];
    async addTodo() {
        const { text } = await inquirer.prompt({
            type: 'input',
            name: 'text',
            message: chalk.green('Enter your todo:')
        });
        const newTodo = {
            title: text,
            completed: false
        };
        this.todos.push(newTodo);
        console.clear();
        console.log(chalk.green("'Todo Added successfully!'"));
        this.showTodos();
    }
    async deleteTodo() {
        const { id } = await inquirer.prompt({
            type: 'input',
            name: 'id',
            message: chalk.red('Enter the ID of the todo to delete:')
        });
        const todoIndex = this.todos.findIndex((todo, index) => index === parseInt(id));
        if (todoIndex !== -1) {
            this.todos.splice(todoIndex, 1);
            console.log(this.todos);
            console.log(chalk.red("'Todo deleted successfully!'"));
            this.showTodos();
        }
        else {
            console.log(chalk.yellowBright('Todo not found!'));
        }
    }
    async updateTodo() {
        const { id } = await inquirer.prompt({
            type: 'input',
            name: 'id',
            message: chalk.red('Enter the ID of the todo to Update:')
        });
        const todoIndex = this.todos.findIndex((todo, index) => index === parseInt(id));
        if (todoIndex !== -1) {
            const { text, completed } = await inquirer.prompt([{
                    type: 'input',
                    name: 'text',
                    message: chalk.green('Enter the ID of the todo to Update:')
                }, {
                    type: 'list',
                    name: 'completed',
                    message: chalk.green('Enter the ID of the todo to Update:'),
                    choices: ["Completed", "Incomplete"]
                }]);
            this.todos[todoIndex].title = text;
            this.todos[todoIndex].completed = completed === "Completed" ? true : false;
            console.log(chalk.red("'Todo Updated successfully!'"));
            this.showTodos();
        }
        else {
            console.log(chalk.yellowBright('Todo not found!'));
        }
    }
    showTodos() {
        // console.clear();
        let data = this.todos;
        console.log(`<=================        Your To do List            =================>`);
        console.log(chalk.bgBlack(`ID--> Title Status`));
        data.forEach((todo, index) => {
            console.log(chalk.bgGray(`${index} --> ${todo.title} Complete Status: ${todo.completed}`));
        });
    }
}
