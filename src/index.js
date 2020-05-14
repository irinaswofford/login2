import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Landing from './routes/Landing';
import Home from './routes/Home';
import { Router, Route } from 'react-router-dom';
import UserList from './components/UserList';
import UserDetail from './components/UserDetail';
import history from './history';
import { Provider } from "react-redux";
import store from "./store/index";



ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <div>
        <Route exact path="/" component={Landing} />
        <Route path="/home" component={Home} />
        <Route path="/userList" component={UserList} />
        <Route exact path="/users/:userId" component={UserDetail} />
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
)



