
import React from "react";
import { TreeView as BasicTreeView } from '@material-ui/lab';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CheckBox from '../CheckBox';
import isEmpty from 'lodash/isEmpty';
import TreeItem from '../TreeItem';
import { PERMISSON_LABEL_MAPPING, ROLES_PERMISSIONS } from './mock';

const PermissionByType = ({id, item, selected, onSelectItem}) => {
  const permissionTypes = ['add', 'edit', 'delete'];

  return permissionTypes.map(permissionType => {
    const nodeId = `${id}_${permissionType}`;
    const isSelected = !isEmpty(selected[nodeId]);
    return (
    <TreeItem
      hide={isEmpty(item[permissionType])}
      nodeId={nodeId}
      label={<><CheckBox checked={isSelected[nodeId]} onClick={onSelectItem(nodeId, !isSelected)}/>{item[permissionType]}</>}
    />);
    })
};

const PermissionItem = ({ selected, permission, onSelectItem }) => {
  const permissionId = permission.id;
  const item = PERMISSON_LABEL_MAPPING[permissionId];
  const nodeId = `${permissionId}`;
  const isSelected = !isEmpty(selected[nodeId]);

  return (
    <TreeItem
      hide={isEmpty(item.read)}
      nodeId={nodeId}
      label={<><CheckBox checked={isSelected[nodeId]} onClick={onSelectItem(nodeId, !isSelected)}/>{item.read}</>}
    >
      <PermissionByType
        id={permissionId}
        item={PERMISSON_LABEL_MAPPING[permissionId]}
        selected={selected}
        onSelectItem={onSelectItem}
      />
    </TreeItem>
  );
};

const defaultState = {
  title: 'Tree View',
  id: null,
  actor: '',
  description: '',
  permissions: ROLES_PERMISSIONS,
};

class TreeView extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      ...defaultState,
      errors: {},
      expanded: [],
      selected: [],
    };
  }

  onToggle = (event, nodeIds) => {
    this.setState(state => ({...state, expanded: nodeIds }));
  };

  onNodeSelect = (event, nodeIds) => {
    this.setState(state => ({ ...state, selected: nodeIds }));
  };

  onSelectItem = (id, newStatus) => () => {
    console.log("TreeView -> onSelectItem -> id", id)
    const stateSelected = this.state.selected;
    
    if (newStatus) {
      return this.setState(state => ({ ...state, selected: [...stateSelected, id]}))
    } else {
      const index = stateSelected.findIndex(id);
      return this.setState(state => ({ ...state, selected: stateSelected.splice(index, 1) }))
    }
  };

  render() {
    const { permissions,  selected } = this.state;

    return (
      <BasicTreeView
        defaultCollapseIcon={<ExpandMoreIcon color="primary"/>}
        defaultExpandIcon={<ChevronRightIcon color="primary" />}
        expanded={this.state.expanded}
        selected={selected}
        onNodeToggle={this.onToggle}
        onNodeSelect={this.onNodeSelect}
        multiSelect
      >
        {permissions.map(role => {
          const permissionId = role.id;
          const item = PERMISSON_LABEL_MAPPING[permissionId];
          const nodeId = `${permissionId}`;
          const isSelected = !isEmpty(selected[nodeId]);
          const children = role.children;
          if(isEmpty(children)) {
            return (
              <TreeItem
                hide={isEmpty(item.read)}
                nodeId={nodeId}
                label={<><CheckBox checked={isSelected[nodeId]} onClick={this.onSelectItem(nodeId, !isSelected)}/>{item.read}</>}
              />
            );
          } else {
            return (
              <TreeItem
                nodeId={nodeId}
                label={<><CheckBox checked={isSelected[[nodeId]]} onClick={this.onSelectItem(nodeId, !isSelected)}/>{item.read}</>}
              >
                { children.map(child=> {
                  return <PermissionItem selected={selected} permission={child} onSelectItem={this.onSelectItem} />
                })}
              </TreeItem>
            );
          }
        })}
      </BasicTreeView>
    );
  };
};

export default TreeView;