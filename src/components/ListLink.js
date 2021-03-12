// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react'

//Loads the list of different list on the left
class ListLink extends Component {
    constructor(props) {
        super(props);
        
        // DISPLAY WHERE WE ARE
        //console.log("\t\t\tListLink " + this.props.toDoList.key + " constructor");
        this.state = {
            editName: false
        }
    }

    componentDidMount = () => {
        // DISPLAY WHERE WE ARE
        //console.log("\t\t\tListLink " + this.props.toDoList.key + " did mount");
    }

    handleLoadList = () => {
        this.props.loadToDoListCallback(this.props.toDoList);
    }

    render() {
        // DISPLAY WHERE WE ARE
        //console.log("\t\t\tListLink render");

        return (
            (this.state.editName)?<input 
                id={'todo-list-' + this.props.toDoList.id} 
                className='todo-list-button' 
                autoFocus={true}
                value={this.props.toDoList.name}
                onBlur={this.editNameComplete}
                onChange={this.editNameChange}
            ></input>:
            <div 
                id={'todo-list-' + this.props.toDoList.id}
                className='todo-list-button'
                onClick={this.handleLoadList}
                onDoubleClick={this.editName}
            >
                {this.props.toDoList.name}<br />
            </div>
        );
    }

    editName = () => {
        this.setState({
            editName: true
        });
    }

    editNameComplete = () => {
        this.setState({
            editName: false
        });
    }

    editNameChange = (event) => {
        this.props.editListNameCallback(this.props.toDoList, event.target.value);
    }
}

export default ListLink;