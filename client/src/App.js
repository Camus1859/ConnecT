import React from 'react';
import Nav from './Nav';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import ProfileRegister from './Profile';
import About from './About';
import NewSearch from './NewSearch';
import Logout from './Logout';
import Error from './Error';

function App() {
    return (
        <Router>
            <Nav />
            <Switch>
                <Route exact path='/login'>
                    <ProfileRegister
                        pageTitle={{
                            page: 'login',
                            UserMsg: 'Welcome',
                            Title:
                                'Looking for someone? Find out if they are looking for you.',
                        }}
                    />
                </Route>

                <Route exact path='/register'>
                    <ProfileRegister
                        pageTitle={{
                            page: 'register',
                            UserMsg: 'Sign Up',
                            Title: 'Are you new?',
                        }}
                    />
                </Route>

                <Route exact path='/new-search'>
                    <NewSearch />
                </Route>

                <Route exact path='/About'>
                    <About />
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
