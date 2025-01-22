import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const withAuthVoting = (WrappedComponent: React.ComponentType) => {
  return (props: any) => {
    const { isAuthenticated } = useAuth();
    if (isAuthenticated) {
      return <Navigate to="/voting" />;
    }

    return <WrappedComponent {...props} />;
  };
};
