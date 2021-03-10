'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../common/jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class RemoveItem_Transaction extends jsTPS_Transaction {
    constructor(initApp, itemToRemove, index) {
        super();
        this.app = initApp;
        this.itemToRemove = itemToRemove;
        this.index = index;
        
    }

    doTransaction() {
        this.app.removeItem(this.itemToRemove.id);
    }

    undoTransaction() {
        this.app.addReturningItem(this.itemToRemove, this.index);
    }
}