import React from 'react';
import propTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core';

const ALIGN_MAP = {
  between: 'space-between',
  center: 'center',
  left: 'flex-start',
  right: 'flex-end'
};

const styles = theme => ({
  panelFooter: {
    display: 'flex',
    marginTop: theme.spacing(3)
  },
  hasLine: {
    paddingTop: theme.spacing(1.5),
    borderTop: '1px solid #efefef'
  }
});

const PanelFooter = ({ classes, children, align, hasLine, ...props }) => {
  const justifyContent = ALIGN_MAP[align];
  return (
    <div
      className={classNames(classes.panelFooter, {
        [classes.hasLine]: hasLine
      })}
      {...props}
      style={{ justifyContent }}
    >
      {children}
    </div>
  );
};

PanelFooter.propTypes = {
  align: propTypes.oneOf(['between', 'center', 'left', 'right'])
};

PanelFooter.defaultProps = {
  align: 'between',
  hasLine: true
};

export default withStyles(styles)(PanelFooter);
