import React from 'react';
import Nav from './Nav';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Profile from './Profile';
import About from './About';
import NewSearch from './NewSearch';
import Login from './Login';
import Logout from './Logout';
import Error from './Error';

function App() {
    return (
        <Router>
            <Nav />
            <Switch>
                <Route exact path='/'>
                    <Profile />
                </Route>

                <Route exact path='/new-search'>
                    <NewSearch />
                </Route>

                <Route exact path='/About'>
                    <About />
                </Route>

                <Route exact path='/login'>
                    <Login />
                </Route>

                <Route exact path='/logout'>
                    <Logout />
                </Route>

                <Route exact path='*'>
                    <Error />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
