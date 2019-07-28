import {Todo} from './todo';

export class TodoService {
    constructor () {
        this.toggleCompletedStatus = this.toggleCompletedStatus.bind(this);
        this.editTodo = this.editTodo.bind(this);
        this._todos = [
            {todoId: 1, name: 'Create Todo', completed: false}, 
            {todoId: 2, name: 'Read Todo', completed: false}];
    }

    get todos () {
        return this._todos;
    }

    addTodo (data) {
        this._todos.push(new Todo(data));
    }

    editTodo(id, text) {
        const found = this._todos.find( ({todoId}) => todoId == id );
        if (!found) {
            return;
        }
        found.name = text;
    }

    toggleCompletedStatus (id) {
        const found = this._todos.find( ({todoId}) => todoId == id );
        if (!found) {
            return;
        }
        
        if(found.completed) {
            found.completed = false;

        } else {
            found.completed = true;
        }
    }
}
