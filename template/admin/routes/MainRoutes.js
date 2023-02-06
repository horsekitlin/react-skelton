import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

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
            element: <DashboardDefault />
        },
        {
            path: 'dashboard',
            children: [
                {
                    path: 'default',
                    element: <DashboardDefault />
                }
            ]
        },
        {
            path: 'utils',
            children: [
                {
                    path: 'util-typography',
                    element: <UtilsTypography />
                }
            ]
        },
        {
            path: 'utils',
            children: [
                {
                    path: 'util-color',
                    element: <UtilsColor />
                },
                {
                    path: 'util-shadow',
                    element: <UtilsShadow />
                }
            ]
        },
        {
            path: 'icons',
            children: [
                {
                    path: 'tabler-icons',
                    element: <UtilsTablerIcons />
                },
                {
                    path: 'material-icons',
                    element: <UtilsMaterialIcons />
                }
            ]
        },
        {
            path: 'sample-page',
            element: <SamplePage />
        }
    ]
};

export default MainRoutes;
