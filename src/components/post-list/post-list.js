/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import React from 'react';
import './post-list.css';

import PostListItem from '../post-list-item';

const PostList = ({posts, vasea, onToggleLiked, onToggleImportant})=>{

    const element = posts.map((item) => {
        const{id, ...balaur} = item;
        
        return(
            <li key={id} className = 'list-group-item'>
                <PostListItem 
                    {...balaur}
                    onDelete={()=>(vasea(id))}
                    onToggleLiked={()=>(onToggleLiked(id))}
                    onToggleImportant={()=>(onToggleImportant(id))}
                />
            </li> 
        );
    });
    return( 
        <ul className="app-list list-group">
            {element}
        </ul>
    );
};

export default PostList;
