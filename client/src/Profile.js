import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import UserMessages from './UserMessages';

// import Logout from './Logout';

const Profile = () => {
    const location = useLocation();
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        race: '',
        feet: '',
        inches: '',
        sex: '',
        bio: '',
        image: '',
    });
    const [showUserMsgs, SetShowUserMsgs] = useState([]);

    const formSubmitHandler = async (e) => {
        e.preventDefault();
        setUserData({
            firstName: '',
            lastName: '',
            race: '',
            feet: '',
            inches: '',
            sex: '',
            bio: '',
            image: '',
        });

        try {
            const response = await fetch('/users/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify(userData),
                credentials: 'include',
            });

            if (response.ok) {
                const clientResponse = await response.json();

                if (clientResponse.error.length > 0) {
                    //show user validation errors
                    SetShowUserMsgs(clientResponse.error);
                    return;
                }

                if (clientResponse.success.length > 0) {
                    console.log('successssss');
                    //show user validation errors
                    SetShowUserMsgs(clientResponse.success);
                    return;
                }

                //backend just saved user data in database, let the user know
            } else {
                //some front end error response is not a 200
                const clientResponse = await response.json();
                //  SetShowUserMsgs(clientResponse.error);
            }
        } catch (e) {
            //show User Error(e) network error
            console.log(e);
        }
    };

    return (
        <>
            <UserMessages showUserMsgs={showUserMsgs} />

            {/* <div>{location.state?.user ? <Logout /> : ''}</div> */}
            <p>Welcome {location.state?.user} !</p>
            <button>Edit</button>
            <form onSubmit={formSubmitHandler}>
                <label>
                    First Name:
                    <input
                        type='text'
                        name='first name'
                        value={userData.firstName}
                        onChange={(e) =>
                            setUserData({
                                ...userData,
                                firstName: e.target.value,
                            })
                        }
                        placeholder='Enter Your First Name'
                    />
                </label>

                <label>
                    Last Name:
                    <input
                        type='text'
                        name='last name'
                        value={userData.lastName}
                        onChange={(e) =>
                            setUserData({
                                ...userData,
                                lastName: e.target.value,
                            })
                        }
                        placeholder='Enter Your Last Name'
                    />
                </label>

                <label htmlFor='race'> Race:</label>

                <select
                    type='text'
                    name='race'
                    value={userData.race}
                    onChange={(e) =>
                        setUserData({
                            ...userData,
                            race: e.target.value,
                        })
                    }
                    placeholder='Enter Your race'
                >
                    <option value='' disabled defaultValue>
                        Enter Your race
                    </option>

                    <option value='American Indian'>American Indian</option>
                    <option value='Asian'>Asian</option>
                    <option value='Black or African American'>
                        Black or African American
                    </option>
                    <option value='Pacific Islander'>Pacific Islander</option>
                    <option value='White or Caucasion'>
                        White or Caucasion
                    </option>
                    <option value='Two or More Races'>Two or More Races</option>
                    <option value='Hispanic'>Hispanic</option>
                </select>

                <label htmlFor='height'>Height:</label>
                <select
                    type='number'
                    name='feet'
                    value={userData.feet}
                    onChange={(e) =>
                        setUserData({
                            ...userData,
                            feet: e.target.value,
                        })
                    }
                    placeholder='ft'
                >
                    <option value='' disabled defaultValue>
                        ft
                    </option>

                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                    <option value='6'>6</option>
                    <option value='7'>7</option>
                    <option value='8'>8</option>
                </select>

                <select
                    type='number'
                    name='inches'
                    value={userData.inches}
                    onChange={(e) =>
                        setUserData({
                            ...userData,
                            inches: e.target.value,
                        })
                    }
                    placeholder='in'
                >
                    <option value='' disabled defaultValue>
                        in
                    </option>

                    <option value='0'>0</option>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                    <option value='6'>6</option>
                    <option value='7'>7</option>
                    <option value='8'>8</option>
                    <option value='9'>9</option>
                    <option value='10'>10</option>
                    <option value='11'>11</option>
                </select>

                <label htmlFor='sex'>Select Your Sex:</label>
                <select
                    name='sex'
                    type='text'
                    value={userData.sex}
                    onChange={(e) =>
                        setUserData({
                            ...userData,
                            sex: e.target.value,
                        })
                    }
                    placeholder='Enter Your Sex'
                >
                    <option value='' disabled defaultValue>
                        Select Sex
                    </option>
                    <option value='Male'>Male</option>
                    <option value='Female'>Female</option>
                    <option value='Other'>Other</option>
                </select>

                <label htmlFor='sex'>Add A bio:</label>
                <textarea
                    name='bio'
                    type='number'
                    value={userData.bio}
                    onChange={(e) =>
                        setUserData({
                            ...userData,
                            bio: e.target.value,
                        })
                    }
                    placeholder='Mini Bio'
                ></textarea>
                <button type='submit'>Submit</button>
            </form>
        </>
    );
};

export default Profile;
