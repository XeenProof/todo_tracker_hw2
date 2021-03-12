'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../common/jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class Text_Transaction extends jsTPS_Transaction {
    constructor(initApp, item, newDate) {
        super();
        this.app = initApp;
        this.newDate = newDate;
        this.item = item;
        this.oldDate = item.due_date;
    }

    doTransaction() {
        this.app.editItemDate(this.item, this.newDate);
    }

    undoTransaction() {
        this.app.editItemDate(this.item, this.oldDate);
    }
}