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
            path: '/login',
            element: <LoginScreen />
        },
        {
            path: '/register',
            element: <RegisterScreen />
        }
    ]
};

export default AuthenticationRoutes;
