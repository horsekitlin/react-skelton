import React from 'react'
import { withStyles } from '@material-ui/core';

const styles = theme => ({
  panelFooter: {
    marginLeft: -25,
    marginRight: -25,
    marginBottom: -30,
    paddingTop: 5,
    paddingBottom: 15,
    paddingLeft: 22,
    paddingRight: 22,
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between'
  }
})

const PanelFooter = ({classes, children, ...props}) => (
  <div className={classes.panelFooter} {...props}>
    {children}
  </div>
)

export default withStyles(styles)(PanelFooter)