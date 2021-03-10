// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react';
import testData from './test/testData.json'
import jsTPS from './common/jsTPS'

// IMPORTING TRANSACTIONS
import AddNewItem_Transaction from './transactions/AddNewItem_Transaction.js'

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
      useVerboseFeedback: true
    }
  }
  //constructor ends here

  // WILL LOAD THE SELECTED LIST
  loadToDoList = (toDoList) => {
    console.log("loading " + toDoList);

    // MAKE SURE toDoList IS AT THE TOP OF THE STACK BY REMOVING THEN PREPENDING
    const nextLists = this.state.toDoLists.filter(testList =>
      testList.id !== toDoList.id
    );
    nextLists.unshift(toDoList);
    this.tps.clearAllTransactions();

    this.setState({
      toDoLists: nextLists,
      currentList: toDoList
    });
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
    });//, this.afterToDoListsChangeComplete);
  }

  addNewItemTransaction = () => {
    let transaction = new AddNewItem_Transaction(this);
    this.tps.addTransaction(transaction);
  }

  //student made
  addNewListItem = () => {
    let newItem = this.makeNewToDoListItem();
    let editedList = this.state.currentList.items;
    editedList.push(newItem);

    this.setState({
      currentList: {items: editedList},
      nextListItemId: this.state.nextListItemId+1
    })
    return newItem;
  }

  //student made
  removeItemFromList = (itemId) => {
    let editedList = this.state.currentList;
    let indexToRemove = getIndexOfItem(editedList, itemId);
    editedList.splice(indexToRemove,1);

    this.setState({
      currentList: {items: editedList}
    })
  }

  getIndexOfItem = (searchedList, desiredItemId) => {
    for (let i = 0; i < this.searchedList.length; i++){
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

  passDownTest = () => {
    this.state.currentList.items[1].description = "changed";
    console.log("passdown success" + this.state.currentList.items[1].description);
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
      dueDate: "none",
      status: "incomplete"
    };
    return newToDoListItem;
  }

  // THIS IS A CALLBACK FUNCTION FOR AFTER AN EDIT TO A LIST
  afterToDoListsChangeComplete = () => {
    console.log("App updated currentToDoList: " + this.state.currentList);

    // WILL THIS WORK? @todo
    let toDoListsString = JSON.stringify(this.state.toDoLists);
    localStorage.setItem("recent_work", toDoListsString);
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
        />
        <Workspace toDoListItems={items} 
          passdownCallback={this.passDownTest}
          addNewItemCallback={this.addNewItemTransaction}
        />
      </div>
    );
  }
}

export default App;