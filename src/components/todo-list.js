import { BaseElment } from './base-element';
import { qs, $delegate, toggleClass } from '../helpers';

export class TodoList extends BaseElment {
    constructor(data, onCompletedToggle, onEditComplete) {
        super();
        this.data = data;
        this.onCompletedToggle = onCompletedToggle;
        this.onEditComplete  = onEditComplete;
        this.toggleCompletion = this.toggleCompletion.bind(this);
        this.toggleEditMode = this.toggleEditMode.bind(this);
        this.editModeDone = this.editModeDone.bind(this);
    }

    toggleCompletion({ target }) {
        const $li = target.parentElement;
        toggleClass($li, 'completed');
        this.onCompletedToggle($li.dataset.id);
    }

    toggleEditMode({target}) {
        const $li = target.parentElement;
        $li.classList.add('editing');
        const input = document.createElement('input');
        input.className = 'edit';

        input.value = target.innerText;
        $li.appendChild(input);
        input.focus();
    }

    editModeDone({ target }) {
        const $li = target.parentElement;
        const id = $li.dataset.id;
        this.onEditComplete(id, target.value.trim());

        const input = qs('input.edit', $li);
        $li.removeChild(input);

        $li.classList.remove('editing');

        qs('.todo-text', $li).textContent = target.value;
    }

    registerEvents() {

        const $todoList = qs('.todo-list');
        $delegate($todoList, '.toggle', 'click', this.toggleCompletion);
        $delegate($todoList, '.todo-text', 'dblclick', this.toggleEditMode);
        $delegate($todoList, 'li .edit', 'blur', this.editModeDone, true);
    }

    renderTodos() {
        return this.data.map(item => {
            return `
            <li data-id=${item.todoId} class="${item.completed?'completed': ''}">
                <input ${item.completed ? 'checked': ''} class="toggle" type="checkbox">
                <span class="todo-text">${item.name}</span>
            </li>`;
        }).join('');
    }

    getElementString() {
        const items = this.renderTodos();
        return `
            <ul class="todo-list">${items}</ul>
        `;
    }
}