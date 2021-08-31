import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ProfileRegister = ({ pageTitle }) => {
    const { page, UserMsg, Title } = pageTitle;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const formSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:5000/${page}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            console.log(response);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div>
            <h1>{Title}</h1>

            {page === 'login' ? (
                <Link to='/register'>Dont have an account yet?</Link>
            ) : (
                <Link to='/login'>Have an account already?</Link>
            )}

            <h1>Connect</h1>
            <h2>{UserMsg}</h2>
            <form onSubmit={formSubmitHandler}>
                <label>
                    Email:
                    <input
                        type='text'
                        name='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>

                <label>
                    Password:
                    <input
                        type='text'
                        name='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>

                <button>Submit</button>
            </form>
        </div>
    );
};

export default ProfileRegister;
