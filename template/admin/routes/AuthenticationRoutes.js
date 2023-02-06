import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// login option 3 routing
const LoginScreen = Loadable(lazy(() => import('screens/LoginScreen')));
const RegisterScreen = Loadable(lazy(() => import('screens/RegisterScreen')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: '/pages/login/login3',
            element: <LoginScreen />
        },
        {
            path: '/pages/register/register3',
            element: <RegisterScreen />
        }
    ]
};

export default AuthenticationRoutes;
