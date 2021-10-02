import React from 'react';
import { useLocation } from 'react-router-dom';

const NewSearch = () => {
    const location = useLocation();

    return (
        <>
            <h1>New Search</h1>
            <p>{location.state?.user}</p>
        </>
    );
};

export default NewSearch;
