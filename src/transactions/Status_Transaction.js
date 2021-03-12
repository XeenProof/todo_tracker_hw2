'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../common/jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class Text_Transaction extends jsTPS_Transaction {
    constructor(initApp, item, newStatus) {
        super();
        this.app = initApp;
        this.newStatus = newStatus;
        this.item = item;
        this.oldStatus = item.status;
    }

    doTransaction() {
        this.app.editItemStatus(this.item, this.newStatus);
    }

    undoTransaction() {
        this.app.editItemStatus(this.item, this.oldStatus);
    }
}