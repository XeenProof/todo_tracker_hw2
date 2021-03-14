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
        let statusType = "item-col text-display status-complete";
        if (listItem.status === "incomplete")
            statusType = "item-col text-display status-incomplete";
        let upVis = (this.props.canMoveUpBoolean(listItem))?"visiable":"hidden";
        let downVis = (this.props.canMoveDownBoolean(listItem))?"visiable":"hidden";

        return (
            <div id={'todo-list-item-' + listItem.id} className='full-item-col list-item-card width item-row-button'>
                {(this.state.editText)? <input type="text" id={'todo-item-' + listItem.id + 'text'} className='item-col list-input-card text-display item-button body-text-font' onChange={this.textEditChange} onBlur={this.textEditComplete} autoFocus={true} value={this.state.text}></input>: 
                <h4 className='item-col text-display body-text-font' onClick={this.textEdit}>{listItem.description}</h4>}

                {(this.state.editDate)? <input type="date" className='item-col list-input-card text-display body-text-font' onBlur={this.dateEditComplete} onChange={this.dateEditChange} autoFocus={true} value={listItem.due_date}></input>:
                <h4 className='item-col text-display body-text-font' onClick={this.dateEdit}>{listItem.due_date}</h4>}

                {(this.state.editStatus)?<select className='item-col list-input-card text-display body-text-font' onBlur={this.statusEditComplete} onChange={this.statusEditChange} autoFocus={true}>
                        <option className="status-complete" value="complete">complete</option>
                        <option className="status-incomplete" value="incomplete">incomplete</option>
                    </select>:
                <h4 className={statusType} onClick={this.statusEdit}>{listItem.status}</h4>}


                <div className='item-col list-controls-col'>
                    <KeyboardArrowUp className='list-item-control' visibility={upVis} onClick={this.up}/>
                    <KeyboardArrowDown className='list-item-control' visibility={downVis} onClick={this.down}/>
                    <Close className='list-item-control' onClick={this.removeItem}/>
                
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