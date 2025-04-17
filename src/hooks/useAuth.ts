// src/hooks/useAuth.ts
import { useState, useEffect } from 'react';

export type User = {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check authentication status when component mounts
    const checkAuth = async () => {
      try {
        // Replace this with your actual authentication check
        const token = localStorage.getItem('authToken');
        if (token) {
          // Verify token with your backend
          // const response = await verifyToken(token);
          // setUser(response.user);
          // setIsAuthenticated(true);
          
          // Temporary mock data
          setUser({
            id: '1',
            name: 'Admin User',
            email: 'admin@amilliontechies.com',
            role: 'admin'
          });
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Authentication check failed:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    // Implement your login logic here
    // const response = await authService.login(email, password);
    // setUser(response.user);
    // setIsAuthenticated(true);
    // return response;
    
    // Temporary mock login
    setUser({
      id: '1',
      name: 'Admin User',
      email: email,
      role: 'admin'
    });
    setIsAuthenticated(true);
    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
    setIsAuthenticated(false);
  };

  return {
    user,
    isAuthenticated,
    loading,
    login,
    logout
  };
}