import React, { useContext, useState } from "react";
import { UserContext } from "../../../../context/user-context";
import { setSearchedValue } from "../../../../context/action-creators";

const SearchBar = () => {
  const {dispatch}=useContext(UserContext)
  
  return (
    <div className="rounded-sm border-l-2 w-full h-full flex items-center justify-center relative">
      <i className="px-3" color="#828282" size="18">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="#828282"
          width="18"
          height="18"
          viewBox="0 0 20 20"
          aria-labelledby="icon-svg-title- icon-svg-desc-"
          role="img"
          className="sc-rbbb40-0 iwHbVQ"
        >
          <title>Search</title>
          <path d="M19.78 19.12l-3.88-3.9c1.28-1.6 2.080-3.6 2.080-5.8 0-5-3.98-9-8.98-9s-9 4-9 9c0 5 4 9 9 9 2.2 0 4.2-0.8 5.8-2.1l3.88 3.9c0.1 0.1 0.3 0.2 0.5 0.2s0.4-0.1 0.5-0.2c0.4-0.3 0.4-0.8 0.1-1.1zM1.5 9.42c0-4.1 3.4-7.5 7.5-7.5s7.48 3.4 7.48 7.5-3.38 7.5-7.48 7.5c-4.1 0-7.5-3.4-7.5-7.5z"></path>
        </svg>
      </i>

      <input
        className="appearance-none rounded w-full py-2 px-3 bg-transparent disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-dark   leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        placeholder="Search for restaurant, cuisine or a dish"
        onChange={(e)=>{
          dispatch(setSearchedValue(e.target.value))
        }}
      ></input>
    </div>
  );
};

export default SearchBar;
