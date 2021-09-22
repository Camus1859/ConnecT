import React, { useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import UserMessages from './UserMessages';

const Logout = () => {
    const [showUserMsgs, SetShowUserMsgs] = useState([]);

    const history = useHistory();
    const location = useLocation();

    const formSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/user/logouts', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            });

            if (response.ok) {
                const clientResponse = await response.json();

                history.push('/login', {
                    msg: clientResponse.message,
                });
            }
        } catch (e) {
            //show User Error(e) network error
        }
    };

    return (
        <>
            <UserMessages showUserMsgs={location.state?.msg || showUserMsgs} />

            <form onSubmit={formSubmitHandler}>
                <button type='submit'>Logout</button>
            </form>
        </>
    );
};

export default Logout;
