import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'layouts/DashboardLayout';
import MainLayout from 'layouts/MainLayout';
// import AccountView from 'src/views/account/AccountView';
// import CustomerListView from 'src/views/customer/CustomerListView';
import DashboardScreen from 'screens/DashboardScreen';
// import LoginView from 'src/views/auth/LoginView';
import NotFoundScreen from 'screens/NotFoundScreen';
// import ProductListView from 'src/views/product/ProductListView';
// import RegisterView from 'src/views/auth/RegisterView';
// import SettingsView from 'src/views/settings/SettingsView';

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'dashboard', element: <DashboardScreen /> },
      // { path: 'account', element: <AccountView /> },
      // { path: 'customers', element: <CustomerListView /> },
      // { path: 'products', element: <ProductListView /> },
      // { path: 'settings', element: <SettingsView /> },
      { path: '*', element: <Navigate to="/404" />  }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      // { path: 'login', element: <LoginView /> },
      // { path: 'register', element: <RegisterView /> },
      { path: '404', element: <NotFoundScreen /> },
      // { path: '/', element: <Navigate to="/app/dashboard" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;