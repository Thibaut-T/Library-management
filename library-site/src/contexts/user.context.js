'use client';
import React, { createContext, useContext, useState } from 'react';

// Create the context
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null); // Initial value can be null or any default user ID
  const contextValue = { userId, setUserId };

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};

// Custom hook to consume the context values
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};