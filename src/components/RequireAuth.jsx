import React from 'react'
import Cookies from 'js-cookie'
import { Navigate } from 'react-router-dom';
export const RequireAuth = ({children}) => {
    
    const accessToken = Cookies.get('accessToken');

  return accessToken? children : <Navigate to="/login" replace />;

}



