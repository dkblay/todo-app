export class BaseElment {
    constructor() {
        this.element = null;
    }

    appendToElement(el, wrap = false) {
        this.createElement();
        if(wrap) {
            el.appendChild(this.element);
        } else {
            el.innerHTML = this.element.innerHTML;
        }
        setTimeout(() => {
            if (typeof this.registerEvents === 'function') {
                this.registerEvents();
            }
        }, 0);
    }

    createElement() {
        const s = this.getElementString();
        const tmp = document.createElement('div');
        tmp.innerHTML = s;
        this.element = tmp;
    }

    getElementString() {
        throw new Error('Please override getElmentString() in BaseElement.');
    }
}
