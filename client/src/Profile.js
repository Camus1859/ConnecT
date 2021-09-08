import React from 'react';
import { useLocation } from 'react-router-dom';
import Logout from './Logout';

const Profile = () => {
    const location = useLocation();

    return (
        <>
            <div>{location.state?.user ? <Logout /> : ''}</div>
            <p>{location.state?.user}</p>
        </>
    );
};

export default Profile;
