
export const PERMISSON_LABEL_MAPPING = {
  1: {
    'read': 'dashboard',
    'add': '',
    'edit': '',
    'delete': '',
  },
  99: {
    'read': 'system settings',
    'add': '',
    'edit': '',
    'delete': '',
  },
  98: {
    'read': 'accounts',
    'add': 'add account',
    'edit': 'edit account',
    'delete': 'delete account',
  },
  97: {
    'read': 'roles',
    'add': 'add role',
    'edit': 'edit role',
    'delete': 'delete role',
  },
};

export const ROLES_PERMISSIONS = [
  {
    parent_id: 0,
    id: 1,
    name: 'dashboard',
    read: true,
    add: true,
    edit: true,
    delete: true,
    children: [],
  },
  {
    parent_id: 0,
    id: 99,
    name: 'settings',
    read: true,
    add: true,
    edit: true,
    delete: true,
    children: [
    {
      id: 98,
      name: 'accouints',
      read: true,
      add: true,
      edit: true,
      delete: true,
      children: [],
    },
    {
      id: 97,
      name: 'roles',
      read: true,
      add: true,
      edit: true,
      delete: true,
      children: [],
    }],
  },
];
