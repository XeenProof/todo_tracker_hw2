'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../common/jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class Text_Transaction extends jsTPS_Transaction {
    constructor(initApp, item, newText) {
        super();
        this.app = initApp;
        this.newText = newText;
        this.item = item;
        this.oldText = item.description;
    }

    doTransaction() {
        this.app.editItemText(this.item, this.newText);
    }

    undoTransaction() {
        this.app.editItemText(this.item, this.oldText);
    }
}