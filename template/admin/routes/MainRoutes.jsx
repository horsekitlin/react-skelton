import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import ProtectedRoute from 'components/ProtectedRoute';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('screens/DashboardScreen')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('screens/UtilsTypographyScreen')));
const UtilsColor = Loadable(lazy(() => import('screens/UtilsColorScreen')));
const UtilsShadow = Loadable(lazy(() => import('screens/UtilsShadowScreen')));
const UtilsMaterialIcons = Loadable(lazy(() => import('screens/UtilsMaterialIconsScreen')));
const UtilsTablerIcons = Loadable(lazy(() => import('screens/UtilsTablerIconsScreen')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('screens/SampleScreen')));

const TaskScreen = Loadable(lazy(() => import('screens/TaskScreen')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <ProtectedRoute><DashboardDefault /></ProtectedRoute>
        },
        {
            path: '/tasks',
            element: <ProtectedRoute><TaskScreen /></ProtectedRoute>
        },
        {
            path: 'dashboard',
            children: [
                {
                    path: 'default',
                    element: <ProtectedRoute><DashboardDefault /></ProtectedRoute>
                }
            ]
        },
        {
            path: 'utils',
            children: [
                {
                    path: 'util-typography',
                    element: <ProtectedRoute><UtilsTypography /></ProtectedRoute>
                },
                {
                    path: 'util-color',
                    element: <ProtectedRoute><UtilsColor /></ProtectedRoute>
                },
                {
                    path: 'util-shadow',
                    element: <ProtectedRoute><UtilsShadow /></ProtectedRoute>
                }
            ]
        },
        {
            path: 'icons',
            children: [
                {
                    path: 'tabler-icons',
                    element: <ProtectedRoute><UtilsTablerIcons /></ProtectedRoute>
                },
                {
                    path: 'material-icons',
                    element: <ProtectedRoute><UtilsMaterialIcons /></ProtectedRoute>
                }
            ]
        },
        {
            path: 'sample-page',
            element: <ProtectedRoute><SamplePage /></ProtectedRoute>
        }
    ]
};

export default MainRoutes;
