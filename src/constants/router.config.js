import React from "react";
import DashboardIcon from '@material-ui/icons/Dashboard';
import SettingsIcon from "@material-ui/icons/Settings";
import AllInboxIcon from "@material-ui/icons/AllInbox";
import HomeContainer from "../screens/HomeScreen";
import ErrorPageContainer from "../screens/ErrorPageScreen";
import ElementContainer from "../screens/ElementScreen";

const routerConfig = [
  {
    id: 'defaultPage',
    permissionId: 'default',
    permissionType: 'read',
    icon: <DashboardIcon />,
    title: '主目录',
    component: HomeContainer,
    path: '/'
  },
  {
    id: 'elements',
    permissionId: 'elements',
    permissionType: 'read',
    icon: <AllInboxIcon />,
    title: '元件目录',
    component: ElementContainer,
    path: '/elements'
  },
  {
    id: 'settings',
    permissionId: 'settings',
    permissionType: 'read',
    icon: <SettingsIcon />,
    title: '系统设置',
    children: [
      {
        permissionId: 'accounts',
        permissionType: 'read',
        text: '帐号列表',
        component: ElementContainer,
        path: '/system/account'
      },
      {
        permissionId: 'roles',
        permissionType: 'read',
        text: '角色列表',
        component: ElementContainer,
        path: '/system/role'
      },
    ]
  },
  {
    id: 'SysPage',
    permissionId: 'default',
    permissionType: 'read',
    hide: true,
    children: [
      {
        text: '错误页面404',
        funGroup: 'SystemFunction',
        component: ErrorPageContainer,
        path: '*'
      }
    ]
  }
];

export default routerConfig;
