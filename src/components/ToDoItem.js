// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react'
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import Close from '@material-ui/icons/Close';

class ToDoItem extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            editText: false,
            editDate: false,
            editStatus: false
        }
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
        let statusType = "status-complete";
        if (listItem.status === "incomplete")
            statusType = "status-incomplete";

        return (
            <div id={'todo-list-item-' + listItem.id} className='list-item-card todo-button test'>
                {(this.state.editText)? <input type="text" className='text-display todo-button' onChange={(e) => this.textEditChange(e)} onBlur={this.textEditComplete} autoFocus={true} value={listItem.description}></input>: 
                <div className='text-display todo-button' onClick={this.textEdit}>{listItem.description}</div>}

                {(this.state.editDate)? <input type="date" className='text-display todo-button' onBlur={this.dateEditComplete} onChange={(e) => this.dateEditChange(e)} autoFocus={true} value={listItem.due_date}></input>:
                <div className='text-display todo-button' onClick={this.dateEdit}>{listItem.due_date}</div>}

                {(this.state.editStatus)?<select className='text-display todo-button' onBlur={this.statusEditComplete} onChange={(e) => this.statusEditChange(e)}>
                        <option className="status-complete" value="complete">complete</option>
                        <option className="status-incomplete" value="incomplete">incomplete</option>
                    </select>:
                <div className='text-display todo-button' onClick={this.statusEdit} className={statusType}>{listItem.status}</div>}

                <div className='item-col todo-button'></div> 
                <div className='button-trio text-display todo-button'>
                    <KeyboardArrowUp className='list-item-control todo-button' onClick={this.up}/>
                    <KeyboardArrowDown className='list-item-control todo-button' onClick={this.down}/>
                    <Close className='list-item-control todo-button' onClick={this.removeItem}/>
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
            editText: true
        });
    }

    textEditComplete = (event) => {
        console.log(event.target.value);
        this.setState({
            editText: false
        });
    }

    textEditChange = (event) => {
        console.log(this.props.toDoListItem);
        this.props.editTextCallback(this.props.toDoListItem, event.target.value);
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
        //edit background here
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
        //edit background here
    }
}

export default ToDoItem;