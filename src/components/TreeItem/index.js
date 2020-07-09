import React, { Fragment } from "react";
import propTypes from 'prop-types';
import { TreeItem as BasicTreeItem } from '@material-ui/lab';

const TreeItem = ({ hide, ...props }) => {
  if(hide) return <Fragment />;

  return (
    <BasicTreeItem
      { ...props }
    />
  );
};

TreeItem.propTypes = {
  hide: propTypes.bool,
};

TreeItem.defaultPropTypes = {
  hide: false,
  label: 'default'
};

export default TreeItem;