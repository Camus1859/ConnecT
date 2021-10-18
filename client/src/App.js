import React, { useState } from 'react';
import Nav from './Nav';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import SignupLogin from './Signup_Login';
import About from './About';
import NewSearch from './NewSearch';
import Profile from './Profile';
import Messages from './Messages';


function App() {
    return (
        <Router forceRefresh={true}>
            <Nav />
            <Switch>
                <Route exact path='/signup'>
                    <SignupLogin
                        pageTitle={{
                            page: 'signup',
                            UserMsg: '',
                            Title:
                                'Looking for someone? Find out if they are looking for you.',
                            button: 'Sign Up',
                        }}
                    />
                </Route>

                <Route exact path='/login'>
                    <SignupLogin
                        pageTitle={{
                            page: 'login',
                            UserMsg: 'Sign In',
                            Title: '',
                            button: 'Login',
                        }}
                    />
                </Route>

                <Route exact path='/user/profile'>
                    <Profile />
                </Route>

                <Route exact path='/search'>
                    <NewSearch />
                </Route>

                <Route exact path='/About'>
                    <About />
                </Route>

                <Route exact path='/messages'>
                    <Messages />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
