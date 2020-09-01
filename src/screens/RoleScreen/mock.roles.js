import { fromJS } from 'immutable';

const rolePermission = [
  {
    parent_id: 0,
    id: 1,
    name: 'dashboard',
    read: false,
    add: false,
    edit: false,
    delete: false,
    children: [],
  },
  {
    parent_id: 0,
    id: 99,
    name: 'settings',
    read: false,
    add: false,
    edit: false,
    delete: false,
    children: [98, 97, 96],
  },
  {
    parent_id: 99,
    id: 98,
    name: 'accouints',
    read: false,
    add: false,
    edit: false,
    delete: false,
    children: [],
  },
  {
    parent_id: 99,
    id: 97,
    name: 'roles',
    read: true,
    add: true,
    edit: true,
    delete: true,
    children: [],
  },
];

const roles = [
  { name: 'administrator', desc:'admin', rolePermission },
  { name: 'manager', desc:'management', rolePermission }
];

const MOCK_ROLES = fromJS({
  ...roles
});

export default MOCK_ROLES;