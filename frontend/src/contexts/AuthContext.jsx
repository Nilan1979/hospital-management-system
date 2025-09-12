import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in on app start
    const savedAuth = localStorage.getItem('isAuthenticated');
    const savedUserType = localStorage.getItem('userType');
    const savedUsername = localStorage.getItem('username');

    if (savedAuth === 'true' && savedUsername && savedUserType) {
      setIsAuthenticated(true);
      setUser({
        username: savedUsername,
        userType: savedUserType
      });
    }
    setLoading(false);
  }, []);

  const login = (username, password, userType) => {
    // Simple authentication - in real app, this would call an API
    if (username === 'admin' && password === '1234') {
      const userData = { username, userType };
      
      setIsAuthenticated(true);
      setUser(userData);
      
      // Persist in localStorage
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userType', userType);
      localStorage.setItem('username', username);
      
      return { success: true };
    } else {
      return { 
        success: false, 
        error: 'Invalid username or password. Please use "admin" and "1234".' 
      };
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    
    // Clear localStorage
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userType');
    localStorage.removeItem('username');
  };

  const value = {
    isAuthenticated,
    user,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;