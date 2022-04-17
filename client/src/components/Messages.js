import React from 'react';
import { useLocation } from 'react-router-dom';

function Messages() {
    const location = useLocation();

    return (
        <>
            <h1>Messages</h1>
            <p>{location.state?.user}</p>
        </>
    );
}

export default Messages;
