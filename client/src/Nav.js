import React, {useState} from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import UserMessages from './UserMessages';

function Nav() {
    const [showUserMsgs, SetShowUserMsgs] = useState([]);
    const [isLoggedIn, setIsLoggedIn] =useState([false])
    const location = useLocation();
    const history = useHistory();



    const fetchSearchPage = async (e) => {

    try{
        const response = await fetch('http://localhost:5000/search', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                credentials: 'include',
            },
        });

    }catch(e){
             //show User Error(e) network error
             console.log(e);

    }

    }



    const fetchProfilePage = async (e) => {
        try {
            const response = await fetch('http://localhost:5000/user/profile', {
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
                    console.log(clientResponse)
                    SetShowUserMsgs(clientResponse.error);
                }else{

                      // response good and no user, or network error so go to login page and show welcome message
                    //   history.push('/user/profile', {
                    //     msg: clientResponse.welcomeMsg,
                    // });

                }






            }else {
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
        <UserMessages showUserMsgs={showUserMsgs} />
        <nav>
            <ul>
                <li>
                    <Link to='/'>Sign Up</Link>
                </li>

                <li>
                    <Link to='/login'>Login</Link>
                </li>

                <li>
                    <Link to='/about'>About</Link>
                </li>

                <li
                    onClick={fetchSearchPage}> New Search
                </li>

                <li onClick={fetchProfilePage}>  Profile </li>
            </ul>
        </nav>
        </>
    );
}

export default Nav;
