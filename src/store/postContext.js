import React, { createContext, useEffect, useState } from 'react';

export const PostContext = createContext(null);

export const Post = ({ children }) => {
    const [postDetails, setPostDetails] = useState(() => {
        const savedPostDetails = localStorage.getItem('postDetails');
        return savedPostDetails ? JSON.parse(savedPostDetails) : {};
      });
    
      // Update local storage whenever postDetails changes
      useEffect(() => {
        localStorage.setItem('postDetails', JSON.stringify(postDetails));
      }, [postDetails]);

  return (
    <PostContext.Provider value={{ postDetails, setPostDetails }}>
      {children}
    </PostContext.Provider>
  );
};
