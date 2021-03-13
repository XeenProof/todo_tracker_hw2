// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react';
import testData from './test/testData.json'
import jsTPS from './common/jsTPS'

// IMPORTING TRANSACTIONS
import AddNewItem_Transaction from './transactions/AddNewItem_Transaction.js'
import RemoveItem_Transaction from './transactions/RemoveItem_Transaction.js'
import Move_Transaction from './transactions/Move_Transaction.js'
import Text_Transaction from './transactions/Text_Transaction.js'
import Date_Transaction from './transactions/Date_Transaction.js'
import Status_Transaction from './transactions/Status_Transaction.js'

// THESE ARE OUR REACT COMPONENTS
import Navbar from './components/Navbar'
import LeftSidebar from './components/LeftSidebar'
import Workspace from './components/Workspace'
{/*import ItemsListHeaderComponent from './components/ItemsListHeaderComponent'
import ItemsListComponent from './components/ItemsListComponent'
import ListsComponent from './components/ListsComponent'
*/}
class App extends Component {//commit test
  constructor(props) {
    // ALWAYS DO THIS FIRST
    super(props);

    // DISPLAY WHERE WE ARE
    console.log("App constructor");

    // MAKE OUR TRANSACTION PROCESSING SYSTEM
    this.tps = new jsTPS();

    // CHECK TO SEE IF THERE IS DATA IN LOCAL STORAGE FOR THIS APP
    let recentLists = localStorage.getItem("recentLists");
    console.log("recentLists: " + recentLists);
    if (!recentLists) {
      recentLists = JSON.stringify(testData.toDoLists);
      localStorage.setItem("toDoLists", recentLists);
    }
    recentLists = JSON.parse(recentLists);

    // FIND OUT WHAT THE HIGHEST ID NUMBERS ARE FOR LISTS
    let highListId = -1;
    let highListItemId = -1;
    for (let i = 0; i < recentLists.length; i++) {
      let toDoList = recentLists[i];
      if (toDoList.id > highListId) {
        highListId = toDoList.id;
      }
      for (let j = 0; j < toDoList.items.length; j++) {
        let toDoListItem = toDoList.items[j];
        if (toDoListItem.id > highListItemId)
        highListItemId = toDoListItem.id;
      }
    };

    // SETUP OUR APP STATE
    this.state = {
      toDoLists: recentLists,
      currentList: {items: []},
      nextListId: highListId+1,
      nextListItemId: highListItemId+1,
      useVerboseFeedback: true,
      listLoaded: false
    }
  }
  //constructor ends here

  // WILL LOAD THE SELECTED LIST
  loadToDoList = (toDoList) => {
    //console.log("loading " + toDoList);

    // MAKE SURE toDoList IS AT THE TOP OF THE STACK BY REMOVING THEN PREPENDING
    const nextLists = this.state.toDoLists.filter(testList =>
      testList.id !== toDoList.id
    );
    nextLists.unshift(toDoList);
    this.tps.clearAllTransactions();

    this.setState({
      toDoLists: nextLists,
      currentList: toDoList,
      listLoaded: true
    }, this.afterToDoListsChangeComplete);
  }

  closeToDoList = () => {
    this.setState({
      currentList: {items: []},
      listLoaded: false
    }, this.afterToDoListsChangeComplete);
  }

  addNewList = () => {//creates a new list and sets it as current list
    let newToDoListInList = [this.makeNewToDoList()];
    let newToDoListsList = [...newToDoListInList, ...this.state.toDoLists];
    let newToDoList = newToDoListInList[0];

    // AND SET THE STATE, WHICH SHOULD FORCE A render
    this.setState({
      toDoLists: newToDoListsList,
      currentList: newToDoList,
      nextListId: this.state.nextListId+1
    }, this.afterToDoListsChangeComplete);
  }

  addNewItemTransaction = () => {
    if(this.state.listLoaded === false){
      return;
    }
    let transaction = new AddNewItem_Transaction(this);
    this.tps.addTransaction(transaction);
  }

  removeItemTransaction = (listItem) => {
    let index = this.getIndexOfItem(this.state.currentList.items,listItem.id);
    let transaction = new RemoveItem_Transaction(this, listItem, index);
    this.tps.addTransaction(transaction);
  }

  upTransaction = (item) => {
    let index = this.getIndexOfItem(this.state.currentList.items, item.id);
    if(index-1 < 0){
      return;
    }
    let transaction = new Move_Transaction(this, index, index-1);
    this.tps.addTransaction(transaction);
  }

  downTransaction = (item) => {
    let index = this.getIndexOfItem(this.state.currentList.items, item.id);
    if(index+1 >= this.state.currentList.items.length){
      return;
    }
    let transaction = new Move_Transaction(this, index, index+1);
    this.tps.addTransaction(transaction);
  }

  textTransaction = (/*oldItem, newItem*/item, newText) => {
    //let transaction = new Text_Transaction(this, oldItem, newItem);
    //this.tps.addTransaction(transaction);

    // console.log("Transaction")
    if (newText == item.description){
      return;
    }
    let transaction = new Text_Transaction(this, item, newText);
    this.tps.addTransaction(transaction);
  }

  dateTransaction = (item, newDate) => {
    let transaction = new Date_Transaction(this, item, newDate);
    this.tps.addTransaction(transaction);
  }

  statusTransaction = (item, newStatus) => {
    let transaction = new Status_Transaction(this, item, newStatus);
    this.tps.addTransaction(transaction);
  }

  //used in: addNewItemTransaction
  addNewListItem = () => {
    let newItem = this.makeNewToDoListItem();
    let toDoLists = this.state.toDoLists;
    let currentList = this.state.currentList;
    let itemList = this.state.currentList.items;
    itemList.push(newItem);

    let newCurrentList = {id: currentList.id, name: currentList.name, items: itemList};
    toDoLists.splice(0,1, newCurrentList);

    this.setState({
      toDoLists: toDoLists,
      currentList: toDoLists[0],
      nextListItemId: this.state.nextListItemId+1
    }, this.afterToDoListsChangeComplete);
    return newItem;
  }

  //used in: addNewItemTransaction, removeItemTransaction
  removeItem = (item) => {
    let itemList = this.state.currentList.items.filter((listItem) => 
      listItem !== item
    );

    let toDoLists = this.state.toDoLists;
    let currentList = this.state.currentList;
    let newCurrentList = {id: currentList.id, name: currentList.name, items: itemList};
    toDoLists.splice(0,1, newCurrentList);

    this.setState({
      toDoLists: toDoLists,
      currentList: toDoLists[0]
    }, this.afterToDoListsChangeComplete);
    return item;
  }

  //used in: removeItemTransaction
  addReturningItem = (item, index) => {
    let itemList = this.state.currentList.items;
    itemList.splice(index, 0, item);

    let toDoLists = this.state.toDoLists;
    let currentList = this.state.currentList;
    let newCurrentList = {id: currentList.id, name: currentList.name, items: itemList};
    toDoLists.splice(0,1, newCurrentList);

    this.setState({
      toDoLists: toDoLists,
      currentList: toDoLists[0]
    }, this.afterToDoListsChangeComplete);
  }


  swapItemByIndex = (a, b) => {
    let itemList = this.state.currentList.items;
    let temp = itemList[a];
    itemList[a] = itemList[b];
    itemList[b] = temp;

    let toDoLists = this.state.toDoLists;
    let currentList = this.state.currentList;
    let newCurrentList = {id: currentList.id, name: currentList.name, items: itemList};
    toDoLists.splice(0,1, newCurrentList);

    this.setState({
      toDoLists: toDoLists,
      currentList: toDoLists[0]
    }, this.afterToDoListsChangeComplete);
  }

  editItem = (newItem) => {
    //console.log(newItem);
    let itemList = this.state.currentList.items;
    let index = this.getIndexOfItem(itemList, newItem.id);
    itemList.splice(index, 1, newItem);

    let toDoLists = this.state.toDoLists;
    let currentList = this.state.currentList;
    let newCurrentList = {id: currentList.id, name: currentList.name, items: itemList};
    toDoLists.splice(0,1, newCurrentList);

    this.setState({
      toDoLists: toDoLists,
      currentList: toDoLists[0]
    }, this.afterToDoListsChangeComplete);
  }

  editItemText = (item, newText) => {
    console.log("text edited: " + newText);
    let newItem = {id: item.id, description: newText, due_date: item.due_date, status: item.status}
    let itemList = this.state.currentList.items;
    itemList.splice(this.getIndexOfItem(itemList, item.id), 1, newItem);
    
    let toDoLists = this.state.toDoLists;
    let currentList = this.state.currentList;
    let newCurrentList = {id: currentList.id, name: currentList.name, items: itemList};
    toDoLists.splice(0,1, newCurrentList);

    this.setState({
      toDoLists: toDoLists,
      currentList: toDoLists[0]
    }, this.afterToDoListsChangeComplete);
  }

  editItemDate = (item, newDate) => {
    let newItem = {id: item.id, description: item.description, due_date: newDate, status: item.status}
    let itemList = this.state.currentList.items;
    itemList.splice(this.getIndexOfItem(itemList, item.id), 1, newItem);
    
    let toDoLists = this.state.toDoLists;
    let currentList = this.state.currentList;
    let newCurrentList = {id: currentList.id, name: currentList.name, items: itemList};
    toDoLists.splice(0,1, newCurrentList);

    this.setState({
      toDoLists: toDoLists,
      currentList: toDoLists[0]
    }, this.afterToDoListsChangeComplete);
  }

  editItemStatus = (item, newStatus) => {
    let newItem = {id: item.id, description: item.description, due_date: item.due_date, status: newStatus}
    let itemList = this.state.currentList.items;
    itemList.splice(this.getIndexOfItem(itemList, item.id), 1, newItem);
    
    let toDoLists = this.state.toDoLists;
    let currentList = this.state.currentList;
    let newCurrentList = {id: currentList.id, name: currentList.name, items: itemList};
    toDoLists.splice(0,1, newCurrentList);

    this.setState({
      toDoLists: toDoLists,
      currentList: toDoLists[0]
    }, this.afterToDoListsChangeComplete);
  }

  editListName = (list, newName) => {
    let newList = {id: list.id, name: newName, items: list.items}
    let toDoLists = this.state.toDoLists;
    let index = this.getIndexOfItem(toDoLists, newList.id);
    toDoLists.splice(index,1,newList);

    this.setState({
      toDoLists: toDoLists,
      currentList: toDoLists[0]
    }, this.afterToDoListsChangeComplete);
  }

  getIndexOfItem = (searchedList, desiredItemId) => {
    for (let i = 0; i < searchedList.length; i++){
      if(searchedList[i].id === desiredItemId){
        return i;
      }
    }
    return -1;
  }

  redo = () => {
    if (this.tps.hasTransactionToRedo()) {
        this.tps.doTransaction();
    }
  }  

  undo = () => {
    if (this.tps.hasTransactionToUndo()) {
      this.tps.undoTransaction();
    }
  }

  makeNewToDoList = () => {
    let newToDoList = {
      id: this.state.nextListId,
      name: 'Untitled',
      items: []
    };
    return newToDoList;
  }

  makeNewToDoListItem = () =>  {
    let newToDoListItem = {
      id: this.state.nextListItemId,
      description: "No Description",
      due_date: "none",
      status: "incomplete"
    };
    return newToDoListItem;
  }

  // THIS IS A CALLBACK FUNCTION FOR AFTER AN EDIT TO A LIST
  afterToDoListsChangeComplete = () => {
    //console.log("App updated currentToDoList: " + this.state.currentList);
    // WILL THIS WORK? @todo
    let toDoListsString = JSON.stringify(this.state.toDoLists);
    localStorage.setItem("recentLists", toDoListsString);
  }

  render() {
    let items = this.state.currentList.items;
    return (
      <div id="root">
        <Navbar />
        <LeftSidebar 
          toDoLists={this.state.toDoLists}
          loadToDoListCallback={this.loadToDoList}
          addNewListCallback={this.addNewList}//Pass to child?
          editListNameCallback={this.editListName}
        />
        <Workspace toDoListItems={items} 
          undoCallback={this.undo}
          redoCallback={this.redo}
          addNewItemCallback={this.addNewItemTransaction}
          closeToDoListCallback={this.closeToDoList}
          upCallback={this.upTransaction}
          downCallback={this.downTransaction}
          removeItemCallback={this.removeItemTransaction}
          editTextCallback={this.textTransaction}
          editDateCallback={this.dateTransaction}
          editStatusCallback={this.statusTransaction}
        />
      </div>
    );
  }
}

export default App;