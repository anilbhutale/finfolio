import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { user } from '@nextui-org/react';

const ProtectedRoutes = () => {
  let userIsVerified = false;
  console.log(userIsVerified + '-----');
  let user = JSON.parse(localStorage.getItem('user'));
  if (user?.username) {
    userIsVerified = true;
  }
  return userIsVerified ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;
