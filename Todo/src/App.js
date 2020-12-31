import React, {Component} from 'react';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import TodosList from './Components/todos-list.components';
import EditTodo from './Components/edit-todo.components';
import CreateTodos from './Components/create-todo.components';
import DeleteTodo from './Components/delete-todo.components';

class App extends Component {
  render() {
  return (
    <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="https://codingthesmartway.com" target="_blank">
              <img src="data:image/jpeg;base64,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" width="30" height="30" alt="CodingTheSmartWay.com" />
            </a>
            <Link to="/" className="navbar-brand">Todo-App</Link>
            <div className="collpase nav-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">Todos</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">Create Todo</Link>
                </li>
              </ul>
            </div>
          </nav>
          <Route path="/" exact component={TodosList} />
          <Route path="/edit/:id" component={EditTodo} />
          <Route path="/create" component={CreateTodos} />
          <Route path="/delete/:id" component={DeleteTodo} />
        </div>
        
    </Router>
  );
  }
}

export default App;
