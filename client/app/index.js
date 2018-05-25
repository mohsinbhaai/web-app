import React from 'react';
import { render } from 'react-dom';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

import App from './components/App/App';
import NotFound from './components/App/NotFound';

import Home from './components/Home/Home';

import './styles/styles.scss';
import About from "./components/About/About";
// import TodoList from './components/Home/TodoList';
// import TodoItem from "./components/Home/TodoItem";

render((
  <Router>
    <App>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/about" component={About}/>
        <Route component={NotFound}/>
        {/*<Route component={TodoList}/>*/}
        {/*<Route component={TodoItem}/>*/}
      </Switch>
    </App>
  </Router>
), document.getElementById('app'));
