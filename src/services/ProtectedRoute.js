import React from 'react';
import { Navigate } from 'react-router-dom';

// Verifica se o usuário está autenticado e permite ou bloqueia o acesso à rota.
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('user'); // Verifica o status de autenticação no localStorage

  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  
  return children;
};

export default ProtectedRoute;
