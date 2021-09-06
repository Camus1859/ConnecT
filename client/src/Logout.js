import React, { useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import UserMessages from './UserMessages';

const Logout = () => {
    const [showUserMsgs, SetShowUserMsgs] = useState([]);

    const history = useHistory();
    const location = useLocation();

    const formSubmitHandler = async (e) => {
        console.log('bbbbbbbbbbbbbb');

        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/user/logouts', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            });
            console.log('oooooooooooooooooooooooooooooo');

            if (response.ok) {
                const clientResponse = await response.json();

                console.log('rannnnnnnnnnnnnnnnnnnnnnnnnnnnnn');

                history.push('/login', {
                    msg: clientResponse.message,
                });


                // history.push({
                //     pathname: '/login',
                //     state: {msg: SetShowUserMsgs(clientResponse.message)}
                // });

            }
        } catch (e) {
            //show User Error(e) network error
            console.log('jjjjjjjjjjjjjjjjjjjjjjjj');
            console.log(e);
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
