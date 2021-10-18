import React, { useEffect, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import UserMessages from './UserMessages';

function Nav() {
    const [showUserMsgs, SetShowUserMsgs] = useState([]);
    const history = useHistory();
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const checkIfUserIsLoggedIn = async () => {
            try {
                const response = await fetch('/user/login', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                        credentials: 'include',
                    },
                });

                const clientResponse = await response.json();
                setLoggedIn(clientResponse);
            } catch (e) {
                console.log(e);
            }
        };
        checkIfUserIsLoggedIn();
    });

    const fetchSignUpOrLoginPage = async (e, signUpOrLoginPath) => {
        e.preventDefault();

        try {
            const response = await fetch(`${signUpOrLoginPath}`, {
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
                    console.log(
                        `user must sign in to path ${signUpOrLoginPath}`
                    );

                    history.push({
                        pathname: `${signUpOrLoginPath}`,
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

    const fetchSearchPageOrProfilePageOrMessages = async (
        e,
        searchOrUserProfilePath
    ) => {
        e.preventDefault();

        try {
            const response = await fetch(searchOrUserProfilePath, {
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
                        pathname: searchOrUserProfilePath,
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
                    <li onClick={(e) => fetchSignUpOrLoginPage(e, '/signup')}>
                        Sign Up
                    </li>

                    <li onClick={(e) => fetchSignUpOrLoginPage(e, '/login')}>
                        Login
                    </li>

                    <li>
                        <Link to='/about'>About</Link>
                    </li>

                    {loggedIn ? (
                        <li
                            onClick={(e) =>
                                fetchSearchPageOrProfilePageOrMessages(
                                    e,
                                    '/search'
                                )
                            }
                        >
                            {' '}
                            New Search
                        </li>
                    ) : (
                        ''
                    )}

                    {loggedIn ? (
                        <li
                            onClick={(e) =>
                                fetchSearchPageOrProfilePageOrMessages(
                                    e,
                                    '/user/profile'
                                )
                            }
                        >
                            {' '}
                            Profile{' '}
                        </li>
                    ) : (
                        ''
                    )}

                    {loggedIn ? (
                        <li
                            onClick={(e) =>
                                fetchSearchPageOrProfilePageOrMessages(
                                    e,
                                    '/messages'
                                )
                            }
                        >
                            {' '}
                            Messages{' '}
                        </li>
                    ) : (
                        ''
                    )}

                    {loggedIn ? (
                      <Logout/>
                    ) : (
                        ''
                    )}
                </ul>
            </nav>
        </>
    );
}

export default Nav;
