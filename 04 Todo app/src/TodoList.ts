// models/TodoList.ts
import  Todo  from './Todo.js';

export default class TodoList {
  private todos: Todo[] = [];

  addTodo(todo: Todo): void {
    this.todos.push(todo);
  }

  getTodos(): Todo[] {
    return this.todos;
  }
}
