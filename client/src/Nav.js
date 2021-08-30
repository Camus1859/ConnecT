import React from 'react';
import { Link } from 'react-router-dom';

function Nav() {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Profile</Link>
                </li>
                
                <li>
                    <Link to="/about">About</Link>
                </li>
                
                
                <li>
                    <Link to="/new-search">New Search</Link>
                </li>
                
                
                <li>
                    <Link to="/login">Login</Link>
                </li>
                
                
                <li>
                    <Link to="/logout">Logout</Link>
                </li>
                
                
                
            </ul>
        </nav>
    )
}

export default Nav;
