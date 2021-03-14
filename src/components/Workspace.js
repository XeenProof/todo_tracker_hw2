// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react'
import ToDoItem from './ToDoItem'
import Undo from '@material-ui/icons/Undo';
import Redo from '@material-ui/icons/Redo';
import AddBox from '@material-ui/icons/AddBox';
import Delete from '@material-ui/icons/Delete';
import Close from '@material-ui/icons/Close';

class Workspace extends Component {
    constructor(props) {
        super(props);
    }

    handleAddNewItem = () =>{
        this.props.addNewItemCallback();
    }

    handleUndo = () => {
        this.props.undoCallback();
    }

    handleRedo = () => {
        this.props.redoCallback();
    }

    handleCloseList = () => {
        this.props.closeToDoListCallback();
    }

    handleDeleteList = () => {
        this.props.deleteListCallback();
    }

    render() {
        let undoVis = (this.props.hasUndoBoolean && this.props.listLoadedBoolean)?"visible":"hidden";
        let redoVis = (this.props.hasRedoBoolean && this.props.listLoadedBoolean)?"visible":"hidden";
        let ListLoaded = (this.props.listLoadedBoolean)?"visiable":"hidden";

        return (
            <div id="workspace">
                <div id="todo-list-header-card" className="list-item-label item-row-button">
                    <div id="task-col-header" className="item-col">Task</div>
                    <div id="date-col-header" className="item-col">Due Date</div>
                    <div id="status-col-header" className="item-col">Status</div>
                    <div className="item-col" display="flex" flexDirection="row" flexWrap="nowrap">
                        <Undo id="undo-button" className="list-item-control material-icons" visibility={undoVis} onClick={this.handleUndo}/>
                        <Redo id="redo-button" className="list-item-control material-icons" visibility={redoVis} onClick={this.handleRedo}/>
                        <AddBox id="add-item-button" className="list-item-control material-icons" visibility={ListLoaded} onClick={this.handleAddNewItem}/>
                        <Delete id="delete-list-button" className="list-item-control material-icons" visibility={ListLoaded} onClick={this.handleDeleteList}/>
                        <Close id="close-list-button" className="list-item-control material-icons" visibility={ListLoaded} onClick={this.handleCloseList}/>
                    </div>
                </div>
                <div id="todo-list-items-div" className= "list-header-card overflow-check">
                    {
                        this.props.toDoListItems.map((toDoListItem) => (
                        <ToDoItem
                            key={toDoListItem.id}
                            toDoListItem={toDoListItem}     // PASS THE ITEM TO THE CHILDREN
                            upCallback={this.props.upCallback}
                            downCallback={this.props.downCallback}
                            removeItemCallback={this.props.removeItemCallback}
                            editTextCallback={this.props.editTextCallback}
                            editDateCallback={this.props.editDateCallback}
                            editStatusCallback={this.props.editStatusCallback}
                            canMoveUpBoolean={this.props.canMoveUpBoolean}
                            canMoveDownBoolean={this.props.canMoveDownBoolean}
                        />))
                    }
                </div>
                <br />
            </div>
        );
    }
}

export default Workspace;