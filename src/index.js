import { TodoService } from './model/store';
import { Page } from './components/page';
import { TodoList } from './components/todo-list';
import { qs, $on } from './helpers';

import './sass/style.scss';

class TodoApp extends Page {
    constructor() {
        super('ToDo Application');
        this.$input = null;
    }

    createElement() {
        this.todoService = new TodoService();
        super.createElement();
        this.loadTodos();
    }

    loadTodos() {
        const {todos,toggleCompletedStatus, editTodo } = this.todoService;
        const todoList = new TodoList(todos,toggleCompletedStatus, editTodo);
        const $todos = qs('.todos', this.element);
        todoList.appendToElement($todos);
    }

    registerEvents() {
        this.$input = qs('.todo__input');
        $on(this.$input, 'keyup', ({ target, keyCode}) => {
            const { value } = target;
            if (value.trim() === '' || keyCode != 13) { return; }

            this.addTodo(value.trim());
        });
    }

    addTodo(value) {
        this.todoService.addTodo(value);
        this.reRender();
        this.$input.value = '';
    }

    reRender() {
        // Here I'm re-rendering all the todo's, but you can just render the single item
        const {todos,toggleCompletedStatus, editTodo } = this.todoService;
        const todoList = new TodoList(todos,toggleCompletedStatus, editTodo);
        qs('.todos').innerHTML = todoList.getElementString();
        todoList.registerEvents();
    }

    getElementString() {
        return `
            <div class="container">
                <h1>todos</h1>
                <input type="text" class="todo__input">
                <div class="todos"></div>
            <div>
        `;
    }
}

const app = new TodoApp();
app.appendToElement(document.getElementById('root'));