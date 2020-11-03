/* eslint-disable react/prop-types */
import React from 'react';
import './app-header.css';

const AppHeader = ({liked, allPosts})=>{
    return(
        <div className="app-header d-flex">
            <h1>Vasile Vasile</h1>
            <h2> {allPosts} items, where liked {liked}</h2>
        </div>);
};

export default AppHeader;




