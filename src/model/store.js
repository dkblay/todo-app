import {Todo} from './todo';

export class TodoService {
    constructor () {
        this.toggleCompletedStatus = this.toggleCompletedStatus.bind(this);
        this.editTodo = this.editTodo.bind(this);
    }


    // return the collection
    get todos () {
    }

    // Add a new todo to the collection
    addTodo (data) {
    }

    // Edit the text of a specific todo
    editTodo(id, text) {
     
    }


    // toggle completion status
    toggleCompletedStatus (id) {
       
    }
}
