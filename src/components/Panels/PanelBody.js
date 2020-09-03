import React from 'react'
import { withStyles } from '@material-ui/core';

const styles = theme => ({

  panelBody: {
    marginTop: theme.spacing(2),
    overflowX: 'auto',
  }
})

const PanelBody = ({classes, children, ...props}) => (
  <div className={classes.panelBody} {...props}>
    {children}
  </div>
)

export default withStyles(styles)(PanelBody);