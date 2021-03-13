'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../common/jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class Text_Transaction extends jsTPS_Transaction {
    constructor(initApp, /*oldItem, newItem,*/ item, newText) {
        super();
        this.app = initApp;
        //this.oldItem = oldItem
        //this.newItem = newItem;
        this.item = item;
        this.oldText = item.description;
        this.newText = newText;
    }

    doTransaction= () => {
        //console.log(this.newItem);
        //this.app.editItem(this.newItem);
        //console.log(this.oldItem);
        this.app.editItemText(this.item, this.newText);
    }

    undoTransaction() {
        //console.log(this.oldText);
        
        //this.app.editItem(this.oldItem);
        //console.log(this.oldItem);
        this.app.editItemText(this.item, this.oldText);
    }
}