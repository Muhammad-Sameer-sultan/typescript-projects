import Todo from './Todo.js';
import TodoList from './TodoList.js';
import inquirer from 'inquirer';
const todoList = new TodoList();
const main = async () => {
    const answer = await inquirer.prompt({
        type: 'input',
        name: 'title',
        message: 'Enter a new todo:',
    });
    const newTodo = new Todo(answer.title);
    todoList.addTodo(newTodo);
    console.log('Todo added successfully!');
    // Display the current todos
    const currentTodos = todoList.getTodos();
    console.log('\nCurrent Todos:');
    currentTodos.forEach((todo, index) => {
        console.log(`${index + 1}. ${todo.title} - ${todo.completed ? 'Completed' : 'Incomplete'}`);
    });
};
main();
