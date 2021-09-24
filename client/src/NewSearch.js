import React from 'react';
import { useLocation } from 'react-router-dom';

const NewSearch = () => {
    const location = useLocation();

    return (
        <>
            <h1>New Search by user </h1>
            <h2>{location.state?.user}</h2>
        </>
    );
};

export default NewSearch;
