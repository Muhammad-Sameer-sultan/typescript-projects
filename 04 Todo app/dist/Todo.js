// Todo.ts
export default class Todo {
    title;
    completed;
    constructor(title, completed = false) {
        this.title = title;
        this.completed = completed;
    }
}
