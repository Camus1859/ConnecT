import React from 'react';
import { useLocation } from 'react-router-dom';
// import Logout from './Logout';

const Profile = () => {
    const location = useLocation();
    console.log('ZZZZZZZZZZZZZZZZZZZ')
    console.log(location.state.user)
    console.log('MMMMMMMMMMMMMMMMMMMMMMMMMM')

    return (
        <>
            {/* <div>{location.state?.user ? <Logout /> : ''}</div> */}
            <p>Welcome {location.state?.user} !</p>
        </>
    );
};

export default Profile;
