import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Main from './components/main';
import User from './components/user';


export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/user" component={User} />
                
            </Switch>
        </BrowserRouter>
    );
}