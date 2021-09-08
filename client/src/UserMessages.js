import React, { useState, useRef, useEffect } from 'react';

const UserMessages = ({ showUserMsgs }) => {
    const showMsgThenRemove = (userMsgs) => {


        setTimeout(function () {
           userMsgs.remove();
          },3000)

    }


    const userMsgs = showUserMsgs.map((msg, index) => (
        <li key={index}>{msg}</li>
    ));

    return (
        <>
            <ul>{showMsgThenRemove(userMsgs)}</ul>
        </>
    );
};

export default UserMessages;