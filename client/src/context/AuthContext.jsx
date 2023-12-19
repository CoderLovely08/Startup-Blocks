import React, { createContext, useContext, useState } from "react";

// Create a context
const AuthContext = createContext();

// Create a provider component to wrap your application with the context
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Function to set the user when logged in
  const login = (userData) => {
    setUser(userData);
  };

  // Function to clear the user when logged out
  const logout = () => {
    setUser(null);
  };

  // Provide the context values to the components
  const contextValue = {
    user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

// Custom hook to access the context values
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
