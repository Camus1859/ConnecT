import React, { useState, useRef, useEffect } from 'react';

const UserMessages = ({ showUserMsgs }) => {

    const userMsgs = showUserMsgs.map((msg, index) => ( <li key={index}>{msg}</li>));


    const showMsgThenRemove = (userMsgs) => {
        setTimeout(function () {
            userMsgs.remove();
        }, 3000);
    };


    console.log(showUserMsgs.length );

    return <>{showUserMsgs.length > 0 ? <ul>{userMsgs}</ul> : ''}</>;
};

export default UserMessages;
