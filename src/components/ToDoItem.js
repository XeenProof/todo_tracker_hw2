// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react'
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import Close from '@material-ui/icons/Close';

class ToDoItem extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            text: this.props.toDoListItem.description,
            editText: false,
            editDate: false,
            editStatus: false
        }
        //console.log(this.state.item);
        // DISPLAY WHERE WE ARE
        //console.log("\t\t\tToDoItem " + this.props.toDoListItem.id + " constructor");
    }

    componentDidMount = () => {
        // DISPLAY WHERE WE ARE
        //console.log("\t\t\tToDoItem " + this.props.toDoListItem.id + " did mount");
    }

    render() {
        // DISPLAY WHERE WE ARE
        //console.log("\t\t\tToDoItem render");
        let listItem = this.props.toDoListItem;
        let statusType = "item-col text-display item-button status-complete";
        if (listItem.status === "incomplete")
            statusType = "item-col text-display item-button status-incomplete";
        let upVis = (this.props.canMoveUpBoolean(listItem))?"visiable":"hidden";
        let downVis = (this.props.canMoveDownBoolean(listItem))?"visiable":"hidden";

        return (
            <div id={'todo-list-item-' + listItem.id} className='item-col list-item-card test item-button'>
                {(this.state.editText)? <input type="text" id={'todo-item-' + listItem.id + 'text'} className='item-col text-display item-button' onChange={this.textEditChange} onBlur={this.textEditComplete} autoFocus={true} value={this.state.text}></input>: 
                <div className='item-col text-display item-button' onClick={this.textEdit}>{listItem.description}</div>}

                {(this.state.editDate)? <input type="date" className='item-col text-display item-button' onBlur={this.dateEditComplete} onChange={this.dateEditChange} autoFocus={true} value={listItem.due_date}></input>:
                <div className='item-col text-display item-button' onClick={this.dateEdit}>{listItem.due_date}</div>}

                {(this.state.editStatus)?<select className='item-col text-display item-button' onBlur={this.statusEditComplete} onChange={this.statusEditChange} autoFocus={true}>
                        <option className="status-complete" value="complete">complete</option>
                        <option className="status-incomplete" value="incomplete">incomplete</option>
                    </select>:
                <div className={statusType} onClick={this.statusEdit}>{listItem.status}</div>}


                <div className='item-col list-controls-col item-button'>
                    <KeyboardArrowUp className='list-item-control item-button' visibility={upVis} onClick={this.up}/>
                    <KeyboardArrowDown className='list-item-control item-button' visibility={downVis} onClick={this.down}/>
                    <Close className='list-item-control item-button' onClick={this.removeItem}/>
                <div className='list-item-control'></div>
                <div className='list-item-control'></div>
                </div>
            </div>
        )
    }

    up = () => {
        this.props.upCallback(this.props.toDoListItem);
    }

    down = () => {
        this.props.downCallback(this.props.toDoListItem);
    }

    removeItem = () => {
        this.props.removeItemCallback(this.props.toDoListItem);
    }

    textEdit = () => {
        this.setState({
            text: this.props.toDoListItem.description,
            editText: true
        });
    }

    textEditComplete = () => {
        console.log("Blurred");
        this.props.editTextCallback(this.props.toDoListItem, this.state.text);
        this.setState({
            editText: false
        });
        
    }

    textEditChange = (event) => {
        // console.log("edit done");
        // let newItem = {
        //     id: this.props.toDoListItem.id,
        //     description: event.target.value,
        //     due_date: this.props.toDoListItem.due_date,
        //     status: this.props.toDoListItem.status
        // }
        // this.setState({
        //     item: newItem
        // });
        this.setState({text: event.target.value});
        //this.props.editTextCallback(this.props.toDoListItem, event.target.value);
    }

    dateEdit = () => {
        this.setState({
            editDate: true
        });
    }

    dateEditComplete = () => {
        this.setState({
            editDate: false
        });
    }

    dateEditChange = (event) => {
        this.props.editDateCallback(this.props.toDoListItem, event.target.value);
    }

    statusEdit = () => {
        this.setState({
            editStatus: true
        });
    }

    statusEditComplete = () => {
        this.setState({
            editStatus: false
        });
    }

    statusEditChange = (event) => {
        this.props.editStatusCallback(this.props.toDoListItem, event.target.value);
    }
}

export default ToDoItem;