// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react'

//Loads the list of different list on the left
class ListLink extends Component {
    constructor(props) {
        super(props);
        
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tListLink " + this.props.toDoList.key + " constructor");
    }

    componentDidMount = () => {
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tListLink " + this.props.toDoList.key + " did mount");
    }

    handleLoadList = () => {
        this.props.loadToDoListCallback(this.props.toDoList);
    }

    render() {
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tListLink render");

        return (
            <div 
                id={'todo-list-' + this.props.toDoList.id}
                className='todo-list-button'
                onClick={this.handleLoadList}
            >
                {this.props.toDoList.name}<br />
            </div>
        )
    }
}

export default ListLink;