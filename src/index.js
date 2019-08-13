import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


import {
    Route,
    Switch,
    BrowserRouter as Router
  } from "react-router-dom";
import Login from './components/Login/Login';
import Main from './components/Main/Main';
import Facturas from './components/Facturas/Facturas';

ReactDOM.render(
    
<Router>
    <Switch>
        <Route exact path='/' component={Login}></Route>
        <Route path='/home' component={Main} />
    </Switch>
</Router>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
