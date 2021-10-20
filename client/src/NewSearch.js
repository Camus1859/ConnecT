import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import UserMessages from './UserMessages';

const NewSearch = () => {
    const location = useLocation();
    const [showUserMsgs, SetShowUserMsgs] = useState([]);

    const [userData, setUserData] = useState({
        encounteredTime: '',
        encounteredDate: '',
        encounteredStreet: '',
        encounteredCity: '',
        encounteredState: '',
        encounteredZipCode: '',
        encounteredPersonsRace: '',
        encounteredPersonsSex: '',
        encounteredPersonsHeightFt: '',
        encounteredPersonsHeightIn: '',
    });

    const formSubmitHandler = async (e) => {
        console.log('yo');
        e.preventDefault();
        setUserData({
            encounteredTime: '',
            encounteredDate: '',
            encounteredStreet: '',
            encounteredCity: '',
            encounteredState: '',
            encounteredZipCode: '',
            encounteredPersonsRace: '',
            encounteredPersonsSex: '',
            encounteredPersonsHeightFt: '',
            encounteredPersonsHeightIn: '',
        });

        console.log(userData);

        try {
            const response = await fetch('/search/user', {
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

            <h1>New Search</h1>
            <form onSubmit={formSubmitHandler}>
                <label htmlFor='time'></label>
                <input
                    type='time'
                    value={userData.encounteredTime}
                    name='time'
                    onChange={(e) =>
                        setUserData({
                            ...userData,
                            encounteredTime: e.target.value,
                        })
                    }
                />

                <label htmlFor='date'></label>
                <input
                    type='date'
                    value={userData.encounteredDate}
                    name='date'
                    onChange={(e) =>
                        setUserData({
                            ...userData,
                            encounteredDate: e.target.value,
                        })
                    }
                />

                <label htmlFor='street'>Street #</label>
                <input
                    type='number'
                    value={userData.encounteredStreet}
                    name='street'
                    onChange={(e) =>
                        setUserData({
                            ...userData,
                            encounteredStreet: e.target.value,
                        })
                    }
                    placeholder='Enter Your Street Number'
                />

                <label htmlFor='City'>City</label>
                <input
                    type='text'
                    value={userData.encounteredCity}
                    name='city'
                    onChange={(e) =>
                        setUserData({
                            ...userData,
                            encounteredCity: e.target.value,
                        })
                    }
                    placeholder='Enter Your City'
                />

                <label htmlFor='state'>State</label>
                <input
                    type='text'
                    value={userData.encounteredState}
                    name='state'
                    onChange={(e) =>
                        setUserData({
                            ...userData,
                            encounteredState: e.target.value,
                        })
                    }
                    placeholder='Enter Your State'
                />

                <label htmlFor='zipcode'>Zip Code</label>
                <input
                    type='number'
                    value={userData.encounteredZipCode}
                    name='zipcode'
                    onChange={(e) =>
                        setUserData({
                            ...userData,
                            encounteredZipCode: e.target.value,
                        })
                    }
                    placeholder='Enter Your Zip Code'
                />

                <label htmlFor='race'> Race:</label>

                <select
                    type='text'
                    name='race'
                    value={userData.encounteredPersonsRace}
                    onChange={(e) =>
                        setUserData({
                            ...userData,
                            encounteredPersonsRace: e.target.value,
                        })
                    }
                    placeholder='Enter Race of Person'
                >
                    <option value='' disabled defaultValue>
                        Enter Race of Person
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

                <label htmlFor='sex'>Sex:</label>
                <select
                    name='sex'
                    type='text'
                    value={userData.encounteredPersonsSex}
                    onChange={(e) =>
                        setUserData({
                            ...userData,
                            encounteredPersonsSex: e.target.value,
                        })
                    }
                    placeholder='Enter Your Sex'
                >
                    <option value='' disabled defaultValue>
                        Enter Sex of Person
                    </option>
                    <option value='Male'>Male</option>
                    <option value='Female'>Female</option>
                    <option value='Other'>Other</option>
                </select>

                <label htmlFor='height'>Height:</label>
                <select
                    type='number'
                    name='feet'
                    value={userData.encounteredPersonsHeightFt}
                    onChange={(e) =>
                        setUserData({
                            ...userData,
                            encounteredPersonsHeightFt: e.target.value,
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
                    value={userData.encounteredPersonsHeightIn}
                    onChange={(e) =>
                        setUserData({
                            ...userData,
                            encounteredPersonsHeightIn: e.target.value,
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

                <button type='submit'>Submit</button>
            </form>
        </>
    );
};

export default NewSearch;
