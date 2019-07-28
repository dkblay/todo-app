export class Todo {
    constructor (name) {
        this.todoId = Date.now();
        this.name = name;
        this.completed = false;
    }
}