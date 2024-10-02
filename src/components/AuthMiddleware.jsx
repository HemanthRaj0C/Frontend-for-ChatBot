import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const AuthMiddleware = ({ children, requiredRole }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  const backendUrl = "http://localhost:3000";

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Make an API call to verify the token
        const response = await axios.get(`${backendUrl}/api/auth/verify-token`, { withCredentials: true });
        const { role } = response.data;

        if (requiredRole === 'admin' && role !== 'admin') {
          console.log('Unauthorized access attempt to admin area');
          navigate('/chat-bot');
        } else if (requiredRole === 'user' && role !== 'user' && role !== 'admin') {
          console.log('Unauthorized access attempt');
          navigate('/login');
        }

        // Special case for /virtual-assistant
        if (location.pathname === '/virtual-assistant' && role === 'user') {
          console.log('User attempting to access admin area, redirecting to chat-bot');
          navigate('/chat-bot');
        }
      } catch (err) {
        console.error('Token verification failed, redirecting to login', err);
        navigate('/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [navigate, requiredRole, location]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default AuthMiddleware;
