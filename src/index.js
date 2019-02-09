import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter  as Router, Route} from "react-router-dom"
import './index.css';
// import App from './containers/app/App.js';
import * as serviceWorker from './serviceWorker';

import TodoList from './containers/todoList/TodoList.js';

ReactDOM.render(
  <Router>
    <Route path="/" component={TodoList} />
  </Router>, 
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
