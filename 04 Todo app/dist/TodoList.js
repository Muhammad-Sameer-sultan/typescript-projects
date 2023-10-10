export default class TodoList {
    todos = [];
    addTodo(todo) {
        this.todos.push(todo);
    }
    getTodos() {
        return this.todos;
    }
}
