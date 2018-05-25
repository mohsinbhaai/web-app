import React, { Component } from "react";
import TodoItem from "./TodoItem";
import Style from 'style-it';
class TodoList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      item: []
    };

    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  addItem(e){
    e.preventDefault();
    if (this._inputElement.value !== "") {
      let newItem = {
        text: this._inputElement.value,
        key: Date.now()
      };

      this.setState((prevState) => {
        return {
          item: prevState.item.concat(newItem)
        };
      });
    }
    this._inputElement.value = "";
    console.log(this.state.item);
  }

  deleteItem(key) {
    const filteredItems = this.state.item.filter(function (item) {
      return (item.key !== key)
    });

    this.setState({
      item: filteredItems
    })
  }

  render() {
    return (
      <Style>
        {`
       .todoListMain .header input {
    padding: 10px;
    font-size: 16px;
    border: 2px solid #FFF;
    width: 165px;
}

.todoListMain .header button {
    padding: 10px;
    font-size: 16px;
    margin: 10px;
    margin-right: 0px;
    background-color: #0066ff;
    color: #fff;
    border: 2px solid #0066ff;
}

.todoListMain.header button:hover {
    background-color: #003399;
    border: 2px solid #003399;
    cursor: pointer;
}

.todoListMain .theList li {
    color: #333;
    background-color: rgba(255, 255, 255, .5);
    padding: 15px;
    margin-bottom: 15px;
    border-radius: 5px;
    list-style: none;

    transition: background-color .2s ease-out;
}

.todoListMain .theList li:hover {
    background-color: pink;
    cursor: pointer;
}

ul.theList {
    padding: 0px;
}

      `}
      <div className="todoListMain">
        <div className="header">

          <form onSubmit={this.addItem}>
            <input type="text" ref={(a) => this._inputElement = a } placeholder="enter task"/>
            <button type="submit">Add</button>
          </form>
        </div>
        <TodoItem entries={this.state.item} delete={this.deleteItem}/>
      </div>
      </Style>
    )
  }
}

export default TodoList;
