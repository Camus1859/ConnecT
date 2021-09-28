import React, { useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import UserMessages from './UserMessages';

function Nav() {
    const [showUserMsgs, SetShowUserMsgs] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState([false]);
    const location = useLocation();
    const history = useHistory();
    let [locationState, UseLocationState] = useState(location.state?.msg);

    const fetchLoginPage = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/login', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    credentials: 'include',
                },
            });

            if (response.ok) {
                const clientResponse = await response.json();

                console.log(clientResponse);

                if (clientResponse.isLoggedIn) {
                    // response good  user is logged in

                    history.push({
                        pathname: '/user/profile',
                        state: { user: clientResponse.user_name },
                    });
                } else {
                    // response good and user needs to login

                    history.push({
                        pathname: '/login',
                    });
                }
            } else {
                //some front end error response is not a 200
                const clientResponse = await response.json();
                SetShowUserMsgs(clientResponse.error);
            }
        } catch (e) {
            //show User Error(e) network error
            console.log(e);
        }
    };

    const fetchSearchPage = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/search', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    credentials: 'include',
                },
            });

            if (response.ok) {
                const clientResponse = await response.json();

                console.log(clientResponse);

                if (clientResponse.error.length > 0) {
                    //show user validation errors
                    history.push('/login', {
                        msg: clientResponse.error,
                    });
                } else {
                    // response good and no user, or network error

                    history.push({
                        pathname: '/search',
                        state: { user: clientResponse.user },
                    });
                }
            } else {
                //some front end error response is not a 200
                const clientResponse = await response.json();
                console.log(clientResponse);
                SetShowUserMsgs(clientResponse.error);
            }
        } catch (e) {
            //show User Error(e) network error
            console.log(e);
        }
    };

    const fetchProfilePage = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/user/profile', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    credentials: 'include',
                },
            });

            if (response.ok) {
                const clientResponse = await response.json();

                if (clientResponse.error.length > 0) {
                    //show user validation errors
                    history.push('/login', {
                        msg: clientResponse.error,
                    });
                } else {
                    // response good and no user, or network error so go to search page, with Welcome message

                    console.log(clientResponse.user);
                    history.push({
                        pathname: '/user/profile',
                        state: { user: clientResponse.user },
                    });
                }
            } else {
                //some front end error response is not a 200
                const clientResponse = await response.json();
                console.log('some front end error response is not a 200');
                SetShowUserMsgs(clientResponse.error);
            }
        } catch (e) {
            //show User Error(e) network error
            console.log(e);
        }
    };

    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link to='/'>Sign Up</Link>
                    </li>

                    <li onClick={fetchLoginPage}>
                        Login
                        {/* <Link to='/login'>Login</Link> */}
                    </li>

                    <li>
                        <Link to='/about'>About</Link>
                    </li>

                    <li onClick={fetchSearchPage}> New Search</li>

                    <li onClick={fetchProfilePage}> Profile </li>
                </ul>
            </nav>
        </>
    );
}

export default Nav;
