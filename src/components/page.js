import { BaseElment } from './base-element';

export class Page extends BaseElment {
    constructor(pageTitle) {
        super();
        this.pageTitle = pageTitle;
    }
}