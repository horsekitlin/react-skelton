import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'layouts/DashboardLayout';
import MainLayout from 'layouts/MainLayout';
import AccountsScreen from 'screens/AccountsScreen';
import CustomersScreen from 'screens/CustomersScreen';
import DashboardScreen from 'screens/DashboardScreen';
import SignInScreen from 'screens/SignInScreen';
import NotFoundScreen from 'screens/NotFoundScreen';
import ProductsScreen from 'screens/ProductsScreen';
import SignUpScreen from 'screens/SignUpScreen';
import SettingScreen from 'screens/SettingScreen';

export const authRoutes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'dashboard', element: <DashboardScreen /> },
      { path: 'account', element: <AccountsScreen /> },
      { path: 'customers', element: <CustomersScreen /> },
      { path: 'products', element: <ProductsScreen /> },
      { path: 'settings', element: <SettingScreen /> },
      { path: '404', element: <NotFoundScreen /> },
      { path: '/', element: <Navigate to="/app/board" /> },
      { path: '*', element: <Navigate to="/404" />  }
    ]
  },
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      { path: 'signin', element: <Navigate to="/app/board" /> },
      { path: 'signup', element: <Navigate to="/app/board" /> },
      { path: '404', element: <NotFoundScreen /> },
      { path: '/', element: <Navigate to="/app/board" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export const noAuthRoutes = [
  {
    path: 'app',
    element: <Navigate to="/signin" />,
    children: [
      { path: '*', element: <Navigate to="/signin" />  }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'signin', element: <SignInScreen /> },
      { path: 'signup', element: <SignUpScreen /> },
      { path: '404', element: <NotFoundScreen /> },
      { path: '/', element: <Navigate to="/signin" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];
