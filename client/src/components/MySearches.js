import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const MySearches = () => {
  const location = useLocation();

  const searches = location.state?.user.map((search, index) => (
    <li key={index}>
      {search} <button>Edit</button>
      <button>Delete</button>
    </li>
  ));
  // Add the ability to click on the search to get its details and update it

  return (
    <>
      <p>Searches</p>

      <ul>{searches} </ul>
    </>
  );
};

export default MySearches;
