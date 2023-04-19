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

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <ProtectedRoute children={<DashboardDefault />} />
        },
        {
            path: 'dashboard',
            children: [
                {
                    path: 'default',
                    element: <ProtectedRoute children={<DashboardDefault />} />
                }
            ]
        },
        {
            path: 'utils',
            children: [
                {
                    path: 'util-typography',
                    element: <ProtectedRoute children={<UtilsTypography />} />
                }
            ]
        },
        {
            path: 'utils',
            children: [
                {
                    path: 'util-color',
                    element: <ProtectedRoute children={<UtilsColor />} />
                },
                {
                    path: 'util-shadow',
                    element: <ProtectedRoute children={<UtilsShadow />} />
                }
            ]
        },
        {
            path: 'icons',
            children: [
                {
                    path: 'tabler-icons',
                    element: <ProtectedRoute children={<UtilsTablerIcons />} />
                },
                {
                    path: 'material-icons',
                    element: <ProtectedRoute children={<UtilsMaterialIcons />} />
                }
            ]
        },
        {
            path: 'sample-page',
            element: <ProtectedRoute children={<SamplePage />} />
        }
    ]
};

export default MainRoutes;
