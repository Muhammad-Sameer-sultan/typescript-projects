#!/usr/bin/env node
// import  Todo  from './Todo.js';
import  TodoList  from './TodoList.js';
import  inquirer from 'inquirer';

const todoList = new TodoList();

const main = async () => {
  while (true) {
    // console.clear();

    const { action } = await inquirer.prompt({
      type: 'list',
      name: 'action',
      message: 'Choose an action:',
      choices: ['Add Todo', 'Update Todo', 'Delete Todo', 'Show Todos', 'Exit']
    });
    
  
      switch (action) {
        case 'Add Todo':
          await todoList.addTodo();;
          break;
        case 'Update Todo':
          await todoList.updateTodo();
          break;
        case 'Delete Todo':
          await todoList.deleteTodo();
          break;
        case 'Show Todos':
          todoList.showTodos();
          break;
        case 'Exit':
          process.exit();
          break;
      }
    }
  

};

main();
