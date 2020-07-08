import React, { Fragment } from 'react';
import { List } from '@material-ui/core';
import SidebarMenuItem from './SidebarMenuItem';
import routerConfig from '../../../constants/router.config';

class SidebarMenu extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      open: null,
    };
  }

  
  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  render() {
    const { permissions } = this.props;

    return (
      <List>
        {routerConfig.map((menuItem, index) => {
          const {
            id,
            icon,
            hide,
            title,
            path,
            permissionId,
            permissionType,
            children=[],
          } = menuItem;

          const hasPermission = permissions.getIn([permissionId, permissionType]) || permissionId === 'default';

        if(!hasPermission || hide) return <Fragment key={`${id}-${index}`} />

        return (
          <SidebarMenuItem
            key={`${id}-${index}`}
            id={id}
            path={path}
            items={children}
            parentIcon={icon}
            parentText={title}
            permissions={permissions}
            {...this.props}
          />)
        })}
      </List>
    );
  }
}

export default SidebarMenu;
