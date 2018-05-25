import React, { Component } from 'react';
import FlipMove from "react-flip-move";
class TodoItem extends Component {

    constructor(props) {
        super(props);

        this.createTask = this.createTask.bind(this);
    }

    createTask(item) {
        return <li onClick={() => this.delete(item.key)} key={item.key}>{item.text}</li>
    }

    delete(key) {
        this.props.delete(key);
    }

    render() {
        const todoEntries = this.props.entries;
        const listItems = todoEntries.map(this.createTask);

        return(
            <ul className="theList">
            <FlipMove duration={250} easing="ease-out">
              {listItems}
              </FlipMove>
            </ul>
        )
    }
}

export default TodoItem;
