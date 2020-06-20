import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Token from './pages/Token';
import AutoToken from './pages/Token/auto.js';

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/home" component={Home} />
                <Route path="/confirmRegister/:mail" component={Token} />
                <Route path="/confirmRegister/:mail/:token" exact component={AutoToken} />
            </Switch>
        </BrowserRouter>
    );
}